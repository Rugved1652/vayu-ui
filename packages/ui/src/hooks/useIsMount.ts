'use client';
import { useState, useEffect } from 'react';

export const useIsMount = () => {
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    setIsMount(false);
  }, []);

  return isMount;
};
