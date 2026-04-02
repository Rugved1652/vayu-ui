'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
  keyPath?: string;
  indexes?: { name: string; keyPath: string; unique?: boolean }[];
}

export interface UseIndexedDBReturn<T> {
  put: (value: T) => Promise<IDBValidKey>;
  add: (value: T) => Promise<IDBValidKey>;
  get: (key: IDBValidKey) => Promise<T | undefined>;
  getAll: () => Promise<T[]>;
  remove: (key: IDBValidKey) => Promise<void>;
  clear: () => Promise<void>;
  count: () => Promise<number>;
  getByIndex: (indexName: string, value: IDBValidKey) => Promise<T[]>;
  isReady: boolean;
  error: Error | null;
}

function openDB(
  dbName: string,
  storeName: string,
  version: number,
  keyPath: string,
  indexes?: { name: string; keyPath: string; unique?: boolean }[],
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath });
        indexes?.forEach((idx) => {
          store.createIndex(idx.name, idx.keyPath, { unique: idx.unique ?? false });
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txn<R>(
  db: IDBDatabase,
  storeName: string,
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest,
): Promise<R> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const req = callback(store);
    req.onsuccess = () => resolve(req.result as R);
    req.onerror = () => reject(req.error);
  });
}

export const useIndexedDB = <T = unknown>({
  dbName,
  storeName,
  version = 1,
  keyPath = 'id',
  indexes,
}: UseIndexedDBOptions): UseIndexedDBReturn<T> => {
  const dbRef = useRef<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    openDB(dbName, storeName, version, keyPath, indexes)
      .then((db) => {
        if (cancelled) {
          db.close();
          return;
        }
        dbRef.current = db;
        setIsReady(true);
      })
      .catch((err) => {
        if (!cancelled) setError(err as Error);
      });

    return () => {
      cancelled = true;
      dbRef.current?.close();
    };
  }, [dbName, storeName, version, keyPath]);

  const ensureDB = useCallback((): IDBDatabase => {
    if (!dbRef.current) throw new Error('IndexedDB is not ready yet');
    return dbRef.current;
  }, []);

  const put = useCallback(
    async (value: T): Promise<IDBValidKey> => {
      try {
        return await txn<IDBValidKey>(ensureDB(), storeName, 'readwrite', (s) => s.put(value));
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [ensureDB, storeName],
  );

  const add = useCallback(
    async (value: T): Promise<IDBValidKey> => {
      try {
        return await txn<IDBValidKey>(ensureDB(), storeName, 'readwrite', (s) => s.add(value));
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [ensureDB, storeName],
  );

  const get = useCallback(
    async (key: IDBValidKey): Promise<T | undefined> => {
      try {
        return await txn<T | undefined>(ensureDB(), storeName, 'readonly', (s) => s.get(key));
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [ensureDB, storeName],
  );

  const getAll = useCallback(async (): Promise<T[]> => {
    try {
      return await txn<T[]>(ensureDB(), storeName, 'readonly', (s) => s.getAll());
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [ensureDB, storeName]);

  const remove = useCallback(
    async (key: IDBValidKey): Promise<void> => {
      try {
        await txn<undefined>(ensureDB(), storeName, 'readwrite', (s) => s.delete(key));
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [ensureDB, storeName],
  );

  const clear = useCallback(async (): Promise<void> => {
    try {
      await txn<undefined>(ensureDB(), storeName, 'readwrite', (s) => s.clear());
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [ensureDB, storeName]);

  const count = useCallback(async (): Promise<number> => {
    try {
      return await txn<number>(ensureDB(), storeName, 'readonly', (s) => s.count());
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [ensureDB, storeName]);

  const getByIndex = useCallback(
    async (indexName: string, value: IDBValidKey): Promise<T[]> => {
      try {
        const db = ensureDB();
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const index = store.index(indexName);
          const req = index.getAll(value);
          req.onsuccess = () => resolve(req.result as T[]);
          req.onerror = () => reject(req.error);
        });
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [ensureDB, storeName],
  );

  return { put, add, get, getAll, remove, clear, count, getByIndex, isReady, error };
};
