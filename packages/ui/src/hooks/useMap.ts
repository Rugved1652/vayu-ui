"use client";
import { useState } from "react";

export const useMap = <K, V>(initialEntries?: [K, V][]) => {
    const [map, setMap] = useState(new Map<K, V>(initialEntries));

    const set = (key: K, value: V) => {
        setMap((prev) => new Map(prev).set(key, value));
    };

    const remove = (key: K) => {
        setMap((prev) => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
        });
    };

    const clear = () => {
        setMap(new Map());
    };

    const has = (key: K) => map.has(key);

    return { map, set, remove, clear, has };
};

