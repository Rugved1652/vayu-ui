'use client';

import { useNetworkStatus } from 'vayu-ui';
import { Wifi, WifiOff } from 'lucide-react';

export function UseNetworkStatusDemo() {
  const { isOnline, offlineAt } = useNetworkStatus();

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6">
      <div
        className={`p-4 rounded-full ${isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} transition-colors duration-300`}
      >
        {isOnline ? <Wifi className="w-12 h-12" /> : <WifiOff className="w-12 h-12" />}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-2xl font-bold">
          {isOnline ? 'You are Online' : 'You are Offline'}
        </span>
        <p className="text-sm text-muted-foreground">
          {isOnline ? 'Everything is looking good.' : 'Please check your internet connection.'}
        </p>
      </div>

      {!isOnline && offlineAt && (
        <div className="w-full p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100 text-center">
          Lost connection at: {offlineAt.toLocaleTimeString()}
        </div>
      )}

      <div className="w-full text-center text-xs text-muted-foreground mt-2">
        Disconnect from Wi-Fi/Ethernet or toggle Offline mode in DevTools to test.
      </div>
    </div>
  );
}
