
import React, { useState } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Check, Loader2, User } from 'lucide-react';
import { GlassCard } from '../../../components/core/GlassCard';
import { useAuthStore } from '../../../store/useAuthStore';
import { storageService } from '../../../services/storageService';
import { AudioGraph } from '../../../services/audioGraph';

const motion = _motion as any;

interface IdentityModalProps {
  onClose: () => void;
}

export const IdentityModal: React.FC<IdentityModalProps> = ({ onClose }) => {
  const { user, updateProfile } = useAuthStore();
  const [username, setUsername] = useState(user?.user_metadata?.username || user?.email?.split('@')[0] || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const publicUrl = await storageService.uploadAvatar(file, user.id, user.user_metadata?.avatar_url);
      await updateProfile({ avatar_url: publicUrl });
      AudioGraph.getInstance().playCoinSound();
    } catch (err) {
      alert("خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({ username });
      AudioGraph.getInstance().playTickSound();
      onClose();
    } catch (err) {
      alert("خطا در بروزرسانی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        <GlassCard className="border-white/10 p-8 rounded-[3.5rem] relative">
          <button onClick={onClose} className="absolute top-6 left-6 text-white/20"><X /></button>
          
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 rounded-[2.8rem] bg-neutral-800 border-2 border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
                {uploading ? (
                  <Loader2 className="animate-spin text-yellow-500" size={32} />
                ) : user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-white/10" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-xl cursor-pointer active:scale-90 transition-transform">
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                <Camera size={20} />
              </label>
            </div>
            <h3 className="text-white font-black text-xl">ویرایش هویت الیت</h3>
          </div>

          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest mr-2">نام نمایشی شما</label>
              <input 
                type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-yellow-500/40 font-bold"
              />
            </div>

            <button 
              onClick={handleSave} disabled={loading || uploading}
              className="w-full bg-white text-black py-5 rounded-[1.8rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> تایید و ثبت</>}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
