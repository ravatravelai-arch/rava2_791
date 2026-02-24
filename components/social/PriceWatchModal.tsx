
import React, { useState } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Coins, CheckCircle2, Loader2, Tag, Upload, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../core/GlassCard';
import { useUserStore } from '../../store/useUserStore';
import { supabase } from '../../services/supabaseClient';

const motion = _motion as any;

interface PriceWatchModalProps {
  poiId: string;
  poiName: string;
  onClose: () => void;
}

export const PriceWatchModal: React.FC<PriceWatchModalProps> = ({ poiId, poiName, onClose }) => {
  const [step, setStep] = useState<'form' | 'uploading' | 'success'>('form');
  const [price, setPrice] = useState('');
  const [item, setItem] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { cityMode } = useUserStore();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!price || !item || !image) return;
    setStep('uploading');

    let uploadedPath = '';

    try {
      const fileName = `${Date.now()}-${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('price_proofs')
        .upload(fileName, image);

      if (uploadError) throw uploadError;
      uploadedPath = fileName;

      // ثبت در جدول گزارشات
      const { data: { user } } = await supabase.auth.getUser();
      const { error: dbError } = await supabase.from('price_reports').insert({
        user_id: user?.id,
        place_id: poiId,
        item_name: item,
        reported_price: parseFloat(price),
        currency: cityMode === 'Istanbul' ? 'TRY' : 'AED',
        proof_image_url: fileName,
        ai_verification_status: 'pending'
      });

      if (dbError) {
        // ATOMIC CLEANUP: اگر ثبت دیتابیس شکست خورد، فایل را پاک کن
        await supabase.storage.from('price_proofs').remove([uploadedPath]);
        throw dbError;
      }

      setStep('success');
    } catch (e: any) {
      console.error("Atomic Transaction Failed:", e);
      alert(`خطا در ارسال گزارش: ${e.message || 'مشکل در اتصال'}`);
      setStep('form');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[7000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
          <GlassCard className="border-white/10 p-8 rounded-[3.5rem] relative overflow-hidden">
            <button onClick={onClose} className="absolute top-6 left-6 text-white/20 active:scale-90 transition-transform"><X /></button>

            {step === 'form' && (
              <div className="space-y-6 text-right">
                <div className="flex flex-col items-center gap-2 mb-4">
                   <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20"><Tag size={32} /></div>
                   <h3 className="text-xl font-black text-white">پلیس قیمت</h3>
                   <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center">Help others & Earn Fuel</p>
                </div>

                <div className="space-y-4">
                  <input 
                    placeholder="نام کالا یا خدمات (مثلا ورودی موزه)" 
                    value={item} onChange={e => setItem(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500/40 text-sm font-bold" 
                  />
                  <div className="relative">
                    <input 
                      type="number" placeholder="قیمت جدید" 
                      value={price} onChange={e => setPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500/40 font-mono text-xl font-black" 
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-black text-xs uppercase">{cityMode === 'Istanbul' ? 'TRY' : 'AED'}</span>
                  </div>
                </div>

                <label className="block border-2 border-dashed border-white/10 rounded-[2rem] p-8 text-center cursor-pointer hover:border-blue-500/40 transition-colors group">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                  {image ? (
                    <div className="flex flex-col items-center gap-2 text-blue-400">
                      <CheckCircle2 size={24} />
                      <span className="text-xs font-bold truncate max-w-[200px]">{image.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/40 group-hover:text-white/60">
                      <Upload size={24} />
                      <span className="text-xs font-bold">عکس از منو یا برچسب قیمت</span>
                    </div>
                  )}
                </label>

                <div className="bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 flex gap-3 items-center">
                   <AlertTriangle size={16} className="text-blue-500 shrink-0" />
                   <p className="text-[9px] text-white/60 leading-relaxed font-bold">گزارش شما توسط هوش مصنوعی بررسی می‌شود. در صورت تایید، ۳۰ دقیقه شارژ رایگان هدیه می‌گیرید.</p>
                </div>

                <button 
                  onClick={handleSubmit} disabled={!price || !item || !image}
                  className="w-full bg-blue-600 py-5 rounded-[1.8rem] text-white font-black text-lg shadow-xl active:scale-95 transition-all disabled:opacity-30"
                >
                  ارسال گزارش
                </button>
              </div>
            )}

            {step === 'uploading' && (
              <div className="py-20 flex flex-col items-center gap-6">
                <Loader2 size={48} className="text-blue-500 animate-spin" />
                <h3 className="text-white font-black text-xl">در حال ارسال امن...</h3>
                <p className="text-white/30 text-[10px] uppercase font-bold">Atomic sync in progress</p>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 text-center space-y-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-black shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                   <CheckCircle2 size={48} />
                </motion.div>
                <div>
                   <h3 className="text-2xl font-black text-white mb-2">دمت گرم رفیق!</h3>
                   <p className="text-white/40 text-sm leading-relaxed font-bold">گزارشت با موفقیت ثبت شد. بعد از تایید هوش مصنوعی، شارژ به کیف پولت اضافه میشه.</p>
                </div>
                <button onClick={onClose} className="w-full bg-white/10 py-4 rounded-2xl text-white font-black active:scale-95 transition-transform">بزن بریم</button>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
