'use client';
import { useState } from 'react';

export const useList = <T>(initialList: T[] = []) => {
  const [list, setList] = useState<T[]>(initialList);

  const add = (item: T) => {
    setList((prevList) => [...prevList, item]);
  };

  const remove = (index: number) => {
    setList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const update = (index: number, newItem: T) => {
    setList((prevList) => prevList.map((item, i) => (i === index ? newItem : item)));
  };

  const clear = () => {
    setList([]);
  };

  return { list, add, remove, update, clear };
};
