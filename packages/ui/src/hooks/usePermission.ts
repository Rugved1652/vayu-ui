'use client';
import { useCallback, useEffect, useState } from 'react';

export type PermissionName =
  | 'camera'
  | 'microphone'
  | 'geolocation'
  | 'notifications'
  | 'persistent-storage'
  | 'push'
  | 'screen-wake-lock'
  | 'midi'
  | 'clipboard-read'
  | 'clipboard-write';

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported' | 'loading';

export interface UsePermissionReturn {
  state: PermissionState;
  isGranted: boolean;
  isDenied: boolean;
  isPrompt: boolean;
  isSupported: boolean;
  request: () => Promise<void>;
}

export const usePermission = (permissionName: PermissionName): UsePermissionReturn => {
  const [state, setState] = useState<PermissionState>('loading');

  const isSupported = typeof navigator !== 'undefined' && 'permissions' in navigator;

  useEffect(() => {
    if (!isSupported) {
      setState('unsupported');
      return;
    }

    let permStatus: PermissionStatus | null = null;

    const handleChange = () => {
      if (permStatus) setState(permStatus.state as PermissionState);
    };

    navigator.permissions
      .query({ name: permissionName as globalThis.PermissionName })
      .then((status) => {
        permStatus = status;
        setState(status.state as PermissionState);
        status.addEventListener('change', handleChange);
      })
      .catch(() => {
        setState('unsupported');
      });

    return () => {
      permStatus?.removeEventListener('change', handleChange);
    };
  }, [permissionName, isSupported]);

  const request = useCallback(async () => {
    try {
      switch (permissionName) {
        case 'camera':
        case 'microphone': {
          const constraints: MediaStreamConstraints = {};
          if (permissionName === 'camera') constraints.video = true;
          if (permissionName === 'microphone') constraints.audio = true;
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          stream.getTracks().forEach((t) => t.stop());
          break;
        }
        case 'geolocation':
          await new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject),
          );
          break;
        case 'notifications':
          await Notification.requestPermission();
          break;
        case 'clipboard-read':
          await navigator.clipboard.readText();
          break;
        case 'clipboard-write':
          await navigator.clipboard.writeText('');
          break;
        default:
          break;
      }
    } catch {}
  }, [permissionName]);

  return {
    state,
    isGranted: state === 'granted',
    isDenied: state === 'denied',
    isPrompt: state === 'prompt',
    isSupported,
    request,
  };
};
