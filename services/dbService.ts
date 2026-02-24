
/**
 * IndexedDB Wrapper v2.1 - Atomic Outbox Pattern
 */
class IndexedDBService {
  private dbName = 'rahnam_resilience_v3';
  private version = 3;
  private stores = {
    places: 'places',
    outbox: 'outbox'
  };

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.stores.places)) db.createObjectStore(this.stores.places);
        if (!db.objectStoreNames.contains(this.stores.outbox)) {
          db.createObjectStore(this.stores.outbox, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async set(key: string, value: any): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction(this.stores.places, 'readwrite');
    tx.objectStore(this.stores.places).put(value, key);
  }

  async get(key: string): Promise<any> {
    const db = await this.getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(this.stores.places, 'readonly');
      const request = tx.objectStore(this.stores.places).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }

  // مدیریت صف آفلاین اتمیک
  async pushToOutbox(action: { type: string; payload: any }): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction(this.stores.outbox, 'readwrite');
    const item = {
      id: crypto.randomUUID(),
      ...action,
      timestamp: Date.now()
    };
    tx.objectStore(this.stores.outbox).add(item);
  }

  async getAllOutboxItems(): Promise<any[]> {
    const db = await this.getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(this.stores.outbox, 'readonly');
      const request = tx.objectStore(this.stores.outbox).getAll();
      request.onsuccess = () => {
        // مرتب‌سازی بر اساس زمان برای حفظ ترتیب وقایع سفر
        const items = request.result.sort((a, b) => a.timestamp - b.timestamp);
        resolve(items);
      };
    });
  }

  async removeFromOutbox(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(this.stores.outbox, 'readwrite');
      const request = tx.objectStore(this.stores.outbox).delete(id);
      request.onsuccess = () => resolve();
    });
  }
}

export const dbService = new IndexedDBService();
