'use client';
import { useState } from 'react';

export const useSet = <T>(initialValues?: T[]) => {
  const [set, setSet] = useState(new Set<T>(initialValues));

  const add = (value: T) => {
    setSet((prev) => new Set(prev).add(value));
  };

  const remove = (value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  };

  const clear = () => {
    setSet(new Set());
  };

  const has = (value: T) => set.has(value);

  return { set, add, remove, clear, has };
};
