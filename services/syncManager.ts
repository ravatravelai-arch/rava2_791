
import { dbService } from './dbService';
import { supabase } from './supabaseClient';
import { useUserStore } from '../store/useUserStore';

class SyncManagerProvider {
  private isSyncing = false;
  private initialized = false;

  init() {
    // گارد بحرانی: جلوگیری از مقداردهی اولیه تکراری در React Strict Mode
    if (this.initialized) return;
    this.initialized = true;

    console.log("[Sync Manager] Initializing global listeners...");
    
    window.addEventListener('online', () => this.processOutbox());
    
    // اجرای اولیه اگر آنلاین هستیم
    if (navigator.onLine) {
      this.processOutbox();
    }
  }

  async processOutbox() {
    if (this.isSyncing || !navigator.onLine) return;
    this.isSyncing = true;

    try {
      const pendingActions = await dbService.getAllOutboxItems();
      if (pendingActions.length === 0) return;

      console.log(`[Sync Manager] Processing ${pendingActions.length} pending actions...`);

      for (const action of pendingActions) {
        let success = false;
        try {
          switch (action.type) {
            case 'DEDUCT_FUEL':
              await supabase.rpc('deduct_fuel', { px_seconds: action.payload.seconds });
              success = true;
              break;
            case 'ADD_TRIP_EVENT':
              await supabase.from('trips').insert(action.payload);
              success = true;
              break;
            case 'PROCESS_STAMP':
              await supabase.rpc('process_poi_visit', action.payload);
              success = true;
              break;
          }

          if (success) {
            await dbService.removeFromOutbox(action.id);
          }
        } catch (individualErr) {
          console.error(`[Sync Manager] Action failed (ID: ${action.id}), will retry.`, individualErr);
          // در صورت خطا، حلقه را می‌شکنیم تا ترتیب وقایع حفظ شود
          break;
        }
      }

      await useUserStore.getState().syncWithCloud();
    } finally {
      this.isSyncing = false;
    }
  }
}

export const syncManager = new SyncManagerProvider();
