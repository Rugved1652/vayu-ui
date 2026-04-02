'use client';

import { useBatteryStatus } from 'vayu-ui';

export function UseBatteryStatusDemo() {
  const { charging, chargingTime, dischargingTime, level, isSupported } = useBatteryStatus();

  const pct = Math.round(level * 100);
  const barColor = pct > 60 ? 'bg-green-500' : pct > 20 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Battery Status</h3>

        {!isSupported ? (
          <p className="text-xs text-muted-foreground">
            Battery API is not supported in this browser.
          </p>
        ) : (
          <>
            {/* Battery visual */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="w-full h-6 bg-muted rounded-md overflow-hidden border">
                  <div
                    className={`h-full ${barColor} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <span className="text-lg font-bold tabular-nums">{pct}%</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">{charging ? '⚡ Charging' : '🔋 Discharging'}</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Level</span>
                <span className="font-medium">{pct}%</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Time to full</span>
                <span className="font-medium">
                  {chargingTime === Infinity ? '—' : `${Math.round(chargingTime / 60)} min`}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Time to empty</span>
                <span className="font-medium">
                  {dischargingTime === Infinity ? '—' : `${Math.round(dischargingTime / 60)} min`}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
