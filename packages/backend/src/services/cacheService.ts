import { CacheModel } from '../models/Cache';
import type { CacheEntry } from '@slides-clone/shared';
import crypto from 'crypto';

export class CacheService {
  private static generateKey(prefix: string, data: any): string {
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(data));
    return `${prefix}:${hash.digest('hex')}`;
  }

  static async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    type: CacheEntry['type'],
    expiresInMs?: number
  ): Promise<T> {
    const cached = CacheModel.get(key, type);

    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return cached as unknown as T;
      }
    }

    const value = await fetchFn();
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    CacheModel.set(key, serialized, type, expiresInMs);

    return value;
  }

  static aiCache<T>(prompt: string, fetchFn: () => Promise<T>, expiresInMs = 7 * 24 * 60 * 60 * 1000): Promise<T> {
    const key = this.generateKey('ai', { prompt });
    return this.getOrSet(key, fetchFn, 'ai', expiresInMs);
  }

  static imageCache<T>(query: string, fetchFn: () => Promise<T>, expiresInMs = 30 * 24 * 60 * 60 * 1000): Promise<T> {
    const key = this.generateKey('image', { query });
    return this.getOrSet(key, fetchFn, 'image', expiresInMs);
  }

  static translationCache<T>(
    text: string,
    targetLang: string,
    fetchFn: () => Promise<T>,
    expiresInMs = 90 * 24 * 60 * 60 * 1000
  ): Promise<T> {
    const key = this.generateKey('translation', { text, targetLang });
    return this.getOrSet(key, fetchFn, 'translation', expiresInMs);
  }

  static invalidate(key: string, type: CacheEntry['type']): boolean {
    return CacheModel.delete(key, type);
  }

  static clearExpired(): void {
    CacheModel.cleanExpired();
  }

  static clearByType(type: CacheEntry['type']): void {
    CacheModel.clear(type);
  }

  static clearAll(): void {
    CacheModel.clear();
  }
}
