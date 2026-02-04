interface TelemetryEvent {
  name: string;
  timestamp: number;
  properties?: Record<string, any>;
}

const TELEMETRY_ENABLED_KEY = 'slideforge-telemetry-enabled';
const TELEMETRY_DATA_KEY = 'slideforge-telemetry-data';

export class Telemetry {
  private static instance: Telemetry;
  private enabled: boolean = false;
  private events: TelemetryEvent[] = [];

  private constructor() {
    const stored = localStorage.getItem(TELEMETRY_ENABLED_KEY);
    this.enabled = stored === 'true';
    this.loadEvents();
  }

  static getInstance(): Telemetry {
    if (!Telemetry.instance) {
      Telemetry.instance = new Telemetry();
    }
    return Telemetry.instance;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem(TELEMETRY_ENABLED_KEY, enabled.toString());
    
    if (!enabled) {
      this.clearEvents();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  track(name: string, properties?: Record<string, any>) {
    if (!this.enabled) return;

    const event: TelemetryEvent = {
      name,
      timestamp: Date.now(),
      properties,
    };

    this.events.push(event);
    this.saveEvents();

    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
      this.saveEvents();
    }
  }

  trackPageView(page: string) {
    this.track('page_view', { page });
  }

  trackAction(action: string, properties?: Record<string, any>) {
    this.track('action', { action, ...properties });
  }

  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  getEvents(limit?: number): TelemetryEvent[] {
    if (limit) {
      return this.events.slice(-limit);
    }
    return [...this.events];
  }

  getStats() {
    if (!this.enabled || this.events.length === 0) {
      return null;
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;

    const eventsToday = this.events.filter(e => now - e.timestamp < oneDay);
    const eventsThisWeek = this.events.filter(e => now - e.timestamp < oneWeek);

    const actionCounts: Record<string, number> = {};
    this.events.forEach(event => {
      if (event.name === 'action' && event.properties?.action) {
        const action = event.properties.action;
        actionCounts[action] = (actionCounts[action] || 0) + 1;
      }
    });

    return {
      totalEvents: this.events.length,
      eventsToday: eventsToday.length,
      eventsThisWeek: eventsThisWeek.length,
      topActions: Object.entries(actionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([action, count]) => ({ action, count })),
    };
  }

  exportData(): string {
    return JSON.stringify({
      enabled: this.enabled,
      events: this.events,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  }

  clearEvents() {
    this.events = [];
    localStorage.removeItem(TELEMETRY_DATA_KEY);
  }

  private saveEvents() {
    try {
      localStorage.setItem(TELEMETRY_DATA_KEY, JSON.stringify(this.events));
    } catch (e) {
      console.warn('Failed to save telemetry events:', e);
    }
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem(TELEMETRY_DATA_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load telemetry events:', e);
      this.events = [];
    }
  }
}

export const telemetry = Telemetry.getInstance();
