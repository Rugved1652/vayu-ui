"use client";
import { useState } from "react";

export const useQueue = <T,>() => {
    const [queue, setQueue] = useState<T[]>([]);

    const add = (item: T) => {
        setQueue((prevQueue) => [...prevQueue, item]);
    };

    const remove = () => {
        setQueue((prevQueue) => prevQueue.slice(1));
    };

    const clear = () => {
        setQueue([]);
    };

    return {
        queue,
        first: queue.length > 0 ? queue[0] : undefined,
        last: queue.length > 0 ? queue[queue.length - 1] : undefined,
        size: queue.length,
        add,
        remove,
        clear,
    };
};

