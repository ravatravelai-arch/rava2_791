
import { supabase } from '../supabaseClient';

export const chatLogger = {
  /**
   * ثبت یک نوبت از مکالمه به صورت Fire & Forget
   */
  async logTurn(role: 'user' | 'model', content: string, metadata: any = {}) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // ثبت در دیتابیس بدون انتظار برای پاسخ (Background Task)
      supabase.from('chat_logs').insert({
        user_id: session.user.id,
        role,
        content,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString()
        }
      }).then(({ error }) => {
        if (error) console.warn("[ChatLogger] Remote log failed:", error);
      });
      
    } catch (e) {
      console.error("[ChatLogger] Internal Error:", e);
    }
  }
};
