
import React, { useState, useMemo } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { MapPin, Car, Eye, X, Volume2, Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { GlassCard } from '../core/GlassCard';
import { useUserStore } from '../../store/useUserStore';
import { ttsService } from '../../services/survival/ttsService';
import { AudioGraph } from '../../services/audioGraph';

const motion = _motion as any;

export const SafeHavenCard: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsError, setTtsError] = useState(false);
  
  const tripEvents = useUserStore(s => s.tripEvents);
  const cityMode = useUserStore(s => s.cityMode);

  const hotelEvent = useMemo(() => {
    return tripEvents.find(e => e.type === 'hotel') || null;
  }, [tripEvents]);

  const hotelName = hotelEvent?.title || "هنوز هتلی ثبت نشده";
  const hotelAddress = hotelEvent?.details?.address || "آدرس هتل در دسترس نیست";

  const handleTTS = async () => {
    if (!hotelEvent || isSpeaking) return;
    setTtsError(false);
    setIsSpeaking(true);
    AudioGraph.getInstance().playTickSound();
    
    try {
      const lang = cityMode === 'Istanbul' ? 'tr-TR' : 'ar-AE'; 
      await ttsService.speak(hotelAddress, lang, 0.75);
    } catch (e) {
      setTtsError(true);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleTaxiDeepLink = () => {
    const encodedAddress = encodeURIComponent(hotelAddress);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  if (!hotelEvent) return (
    <GlassCard className="border-dashed border-white/20 opacity-60">
      <div className="flex flex-col items-center py-6 gap-3">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
           <Shield size={24} className="text-white/20" />
        </div>
        <div className="text-center">
           <p className="text-white/60 font-bold text-sm">جان‌پناه هوشمند</p>
           <p className="text-white/20 text-[10px] mt-1">بلیط هتل را اسکن کنید تا فعال شود</p>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <>
      <GlassCard className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-500/10 to-transparent relative overflow-hidden">
        <div className="absolute top-[-10px] right-[-10px] p-3 opacity-10"><Shield size={80} className="text-yellow-500" /></div>
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center text-black shadow-lg"><MapPin size={28} /></div>
          <div className="text-right">
            <h3 className="text-white font-black text-xl mb-0.5">{hotelName}</h3>
            <span className="text-yellow-500/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 justify-end">Safe Haven Active <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" /></span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <button onClick={() => setIsFullscreen(true)} className="flex items-center justify-center gap-2 bg-white/5 py-4 rounded-2xl text-white/80 text-xs font-black border border-white/10 active:scale-95 transition-all"><Eye size={16} /> نمایش به راننده</button>
          <button onClick={handleTaxiDeepLink} className="flex items-center justify-center gap-2 bg-yellow-500 py-4 rounded-2xl text-black text-xs font-black shadow-xl active:scale-95 transition-all"><Car size={16} /> درخواست اسنپ</button>
        </div>
      </GlassCard>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="fixed inset-0 z-[6000] bg-black p-8 flex flex-col justify-between text-center"
          >
            <div className="flex justify-between items-center">
               <div className="glass px-4 py-2 rounded-full border-white/10 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-white/60 text-[10px] font-black uppercase tracking-tighter">Emergency Taxi View</span></div>
               <button onClick={() => setIsFullscreen(false)} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"><X size={24} /></button>
            </div>
            <div className="space-y-8 overflow-y-auto max-h-[50vh] no-scrollbar py-4 px-2">
              <div className="inline-block px-6 py-2 rounded-full bg-yellow-500 text-black font-black text-xs uppercase tracking-[0.3em]">ADDRESS FOR DRIVER</div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight break-words" style={{ direction: 'ltr' }}>{hotelAddress}</h2>
              <p className="text-yellow-500/60 text-2xl font-bold mt-4">{hotelName}</p>
            </div>
            <div className="flex flex-col gap-6 items-center mb-10">
              <motion.button 
                whileTap={{ scale: 0.85 }} 
                onClick={handleTTS}
                disabled={isSpeaking}
                className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-black shadow-2xl relative ${isSpeaking ? 'bg-indigo-500' : 'bg-white'}`}
              >
                {isSpeaking ? <Loader2 size={48} className="animate-spin text-white" /> : ttsError ? <AlertTriangle size={48} className="text-red-500" /> : <Volume2 size={48} />}
              </motion.button>
              <p className="text-white font-black text-lg">{isSpeaking ? 'در حال پخش...' : ttsError ? 'خطا در پخش صوتی' : 'پخش صوتی آدرس'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
