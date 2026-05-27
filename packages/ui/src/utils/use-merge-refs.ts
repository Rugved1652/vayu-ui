'use client';

import React, { useCallback, useRef } from 'react';

export function useMergeRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): React.RefCallback<T> {
  const refsRef = useRef(refs);
  refsRef.current = refs;

  return useCallback((node) => {
    refsRef.current.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  }, []);
}
