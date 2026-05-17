import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ThreatPayload } from './schema';

interface NexusDB extends DBSchema {
  threats: {
    key: string;
    value: ThreatPayload;
    indexes: { 'by-timestamp': string };
  };
}

let dbPromise: Promise<IDBPDatabase<NexusDB>> | null = null;

if (typeof window !== 'undefined') {
  dbPromise = openDB<NexusDB>('nexus-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('threats', {
        keyPath: 'id',
      });
      store.createIndex('by-timestamp', 'timestamp');
    },
  });
}

export async function saveThreatLocally(threat: ThreatPayload) {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.put('threats', threat);
}

export async function getHistoricalThreats(): Promise<ThreatPayload[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return db.getAllFromIndex('threats', 'by-timestamp');
}
