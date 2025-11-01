import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  track(event: string, data?: Record<string, any>) {
    if (typeof window === 'undefined') return;
    // Hook for real analytics vendor. No-op by default.
    console.debug('[analytics]', event, data ?? {});
  }
}
