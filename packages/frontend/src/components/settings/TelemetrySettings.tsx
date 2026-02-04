import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { telemetry } from '@/utils/telemetry';

export function TelemetrySettings() {
  const [enabled, setEnabled] = useState(telemetry.isEnabled());
  const [stats, setStats] = useState(telemetry.getStats());

  const handleToggle = () => {
    const newValue = !enabled;
    telemetry.setEnabled(newValue);
    setEnabled(newValue);
    setStats(telemetry.getStats());
  };

  const handleExport = () => {
    const data = telemetry.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry-export-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all telemetry data?')) {
      telemetry.clearEvents();
      setStats(telemetry.getStats());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Local Analytics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your usage locally to understand how you use the app. All data stays on your device.
          </p>
        </div>
        <Button
          onClick={handleToggle}
          variant={enabled ? 'default' : 'outline'}
          aria-label={enabled ? 'Disable telemetry' : 'Enable telemetry'}
        >
          {enabled ? 'Enabled' : 'Disabled'}
        </Button>
      </div>

      {enabled && stats && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.eventsToday}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Today</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stats.eventsThisWeek}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">This Week</div>
            </div>
          </div>

          {stats.topActions.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Top Actions</h4>
              <div className="space-y-2">
                {stats.topActions.map((item) => (
                  <div
                    key={item.action}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-2 rounded"
                  >
                    <span className="text-sm">{item.action}</span>
                    <span className="text-sm font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm">
              Export Data
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm">
              Clear Data
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Privacy Notice</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          All telemetry data is stored locally in your browser. No data is sent to any external servers.
          You can export or clear your data at any time.
        </p>
      </div>
    </div>
  );
}
