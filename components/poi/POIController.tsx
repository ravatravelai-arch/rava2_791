
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion as _motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';
import { useMapStore } from '../../store/useMapStore';
import { useUserStore } from '../../store/useUserStore';
import { PlaceService } from '../../services/placeService';
import { AudioGraph } from '../../services/audioGraph';
import { PriceWatchModal } from '../social/PriceWatchModal';
import { StampCelebration } from '../social/StampCelebration';
import { POIMissionAction } from './POIMissionAction';
import { isWithinRadius } from '../../utils/geoUtils';
import { GeoPoint } from '../../utils/geoPoint';
import { 
  X, Sparkles, MapPin, Tag, 
  Loader2, AudioWaveform as Waveform,
  Clock, Zap, Play, Square, BookOpen
} from 'lucide-react';

// Sub-components
import { POIHeader } from './POIHeader';
import { POIFootprintSection } from './POIFootprintSection';

const motion = _motion as any;

const Category3DIcon = ({ category, size = "text-5xl" }: { category: string, size?: string }) => {
  const c = category?.toLowerCase() || '';
  if (c.includes('restaurant') || c.includes('food')) return <span className={`${size} drop-shadow-2xl`}>🍱</span>;
  if (c.includes('cafe') || c.includes('coffee')) return <span className={`${size} drop-shadow-2xl`}>☕</span>;
  if (c.includes('shopping') || c.includes('store') || c.includes('mall')) return <span className={`${size} drop-shadow-2xl`}>🛍️</span>;
  if (c.includes('park') || c.includes('nature')) return <span className={`${size} drop-shadow-2xl`}>🌳</span>;
  if (c.includes('museum') || c.includes('historical') || c.includes('church') || c.includes('mosque')) return <span className={`${size} drop-shadow-2xl`}>🕌</span>;
  return <span className={`${size} drop-shadow-2xl`}>📍</span>;
};

// تابع بهینه‌سازی تصاویر (Unsplash)
const getOptimizedImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    // اگر پارامترهای قبلی دارد، آن‌ها را نگه دار یا بازنویسی کن
    return url.includes('?') ? `${url}&q=70&w=800` : `${url}?q=70&w=800`;
  }
  return url;
};

export const POIController: React.FC = () => {
  const { 
    activePOI, setActivePOI, 
    fullDetailPOI, setFullDetailPOI,
    isLoadingDetails, setLoadingDetails,
    addFootprintToActive, userLocation,
    isCelebratingStamp, setCelebratingStamp,
    isNarrativePlaying, setNarrativePlaying
  } = useMapStore();
  
  const { addStamp, wallet, isStamping } = useUserStore();
  const audioGraph = AudioGraph.getInstance();

  const [vibeCheck, setVibeCheck] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPriceWatch, setShowPriceWatch] = useState(false);

  const activeRequestIdRef = useRef<string | null>(null);

  // ۱. بیداری سیستم عصبی صوتی
  useEffect(() => {
    audioGraph.onNarrativeStop = () => {
      setNarrativePlaying(false);
    };
    return () => {
      audioGraph.onNarrativeStop = null;
    };
  }, [setNarrativePlaying]);

  // ۲. منطق پیش‌بارگذاری هوشمند (Pre-fetching) فاز ۴ - اصلاح شده (CORS Ready)
  useEffect(() => {
    if (fullDetailPOI?.narrative?.audio_url) {
      console.log(`[Resilience] Warming up CORS-ready cache: ${fullDetailPOI.name}`);
      fetch(fullDetailPOI.narrative.audio_url).then(() => {
        console.log(`[Resilience] Narrative cached with full headers.`);
      }).catch(() => {
        console.warn(`[Resilience] Pre-fetch failed. Will try again on Play.`);
      });
    }
  }, [fullDetailPOI]);

  const attemptStamping = useCallback(async (poiId: string, poiName: string, poiLat: number, poiLng: number) => {
    const geo = GeoPoint.fromArray(userLocation);
    if (!geo || isStamping) return;
    
    const isNearby = isWithinRadius(geo.lat, geo.lng, poiLat, poiLng, 150);
    const alreadyStamped = wallet.stamps.some(s => s.placeId === poiId);

    if (isNearby && !alreadyStamped) {
      await addStamp({
        id: Math.random().toString(), 
        placeId: poiId,
        placeName: poiName,
        date: new Date().toLocaleDateString('fa-IR')
      });
      setCelebratingStamp(true);
    }
  }, [userLocation, wallet.stamps, addStamp, setCelebratingStamp, isStamping]);

  const handleExpand = async () => {
    if (!activePOI) return;
    
    const requestId = activePOI.id;
    activeRequestIdRef.current = requestId;
    setLoadingDetails(true);
    
    try {
      const curatedInfo = await PlaceService.fetchHybridDetails(requestId);
      if (activeRequestIdRef.current !== requestId) return;

      const googleInfo = await PlaceService.fetchFullDetails(requestId);
      
      const updatedPOI = { ...activePOI, ...curatedInfo, ...googleInfo };
      setFullDetailPOI(updatedPOI);
      
      if (curatedInfo.is_curated) {
        setVibeCheck(curatedInfo.description || null);
      } else {
        const vibe = await PlaceService.getAIVibeCheck(updatedPOI.reviews || []);
        setVibeCheck(vibe);
      }
      
      attemptStamping(activePOI.id, activePOI.name, activePOI.lat, activePOI.lng);
    } catch (e) {
      console.error("Expand Error:", e);
    } finally {
      if (activeRequestIdRef.current === requestId) {
        setLoadingDetails(false);
      }
    }
  };

  const toggleNarrative = () => {
    if (!fullDetailPOI?.narrative) return;
    
    if (isNarrativePlaying) {
      audioGraph.stopStaticFile();
      setNarrativePlaying(false);
    } else {
      audioGraph.playStaticFile(fullDetailPOI.narrative.audio_url);
      setNarrativePlaying(true);
      AudioGraph.haptic(50);
    }
  };

  const submitFootprint = () => {
    if (!comment.trim() || !fullDetailPOI) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      addFootprintToActive(fullDetailPOI.id, {
        id: Math.random().toString(),
        user: 'شما',
        text: comment,
        date: 'همین الان'
      });
      setComment('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <LayoutGroup>
      <AnimatePresence>
        {activePOI && !fullDetailPOI && (
          <motion.div
            layoutId={`card-${activePOI.id}`}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className="fixed bottom-28 left-4 right-4 z-[3000]"
          >
            <div className="glass rounded-[3.5rem] p-8 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-5 blur-sm transform rotate-12 pointer-events-none">
                <Category3DIcon category={activePOI.category} size="text-9xl" />
              </div>
              <div className="flex items-start justify-between mb-8">
                <button onClick={() => { activeRequestIdRef.current = null; setActivePOI(null); }} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90">
                  <X size={24} />
                </button>
                <div className="text-right flex-1 pr-6">
                  <motion.h3 layoutId={`title-${activePOI.id}`} className="text-white font-black text-3xl mb-1 truncate">{activePOI.name}</motion.h3>
                  <div className="flex items-center justify-end gap-1 text-white/40 text-xs font-bold uppercase tracking-widest">
                    <span>{activePOI.description || 'Ready for Discovery'}</span>
                    <MapPin size={12} className="text-yellow-500" />
                  </div>
                </div>
                <motion.div layoutId={`img-${activePOI.id}`} className="w-20 h-20 bg-white/5 rounded-[2.2rem] flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
                   {activePOI.image ? (
                     <img src={getOptimizedImageUrl(activePOI.image)} className="w-full h-full object-cover" />
                   ) : (
                     <Category3DIcon category={activePOI.category} size="text-4xl" />
                   )}
                </motion.div>
              </div>
              <div className="text-center relative z-10">
                <button onClick={handleExpand} disabled={isLoadingDetails} className="w-full bg-yellow-500 py-6 rounded-[2.2rem] text-black font-black text-xl shadow-[0_20px_50px_rgba(234,179,8,0.3)] flex items-center justify-center gap-4 active:scale-[0.97] transition-all">
                  {isLoadingDetails ? <Loader2 size={28} className="animate-spin" /> : <><span className="mt-1">تحلیل هوشمند و جزئیات 👀</span><Sparkles size={24} /></>}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullDetailPOI && (
          <div className="fixed inset-0 z-[4000] flex items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFullDetailPOI(null)} className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div
              layoutId={`card-${fullDetailPOI.id}`}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 300 }}
              className="relative w-full h-[95vh] bg-[#050505] rounded-t-[5rem] border-t border-white/10 overflow-y-auto no-scrollbar shadow-[0_-50px_100px_rgba(0,0,0,1)]"
            >
              <POIHeader 
                id={fullDetailPOI.id}
                name={fullDetailPOI.name} 
                image={getOptimizedImageUrl(fullDetailPOI.image || '')} 
                rating={fullDetailPOI.rating} 
                category={fullDetailPOI.category}
                onBack={() => setFullDetailPOI(null)}
              />

              <div className="px-12 pt-10 pb-44 space-y-16">
                {fullDetailPOI.narrative && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass bg-yellow-500/10 border-yellow-500/30 p-8 rounded-[4rem] flex flex-col items-center gap-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                       <motion.div 
                         className="h-full bg-yellow-500" 
                         initial={{ width: 0 }} 
                         animate={{ width: isNarrativePlaying ? "100%" : "0%" }}
                         transition={{ duration: fullDetailPOI.narrative.duration_seconds || 60, ease: "linear" }}
                       />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-14 h-14 bg-yellow-500 rounded-3xl flex items-center justify-center text-black shadow-2xl">
                          <BookOpen size={28} />
                       </div>
                       <h4 className="text-white font-black text-xl">داستان اینجا رو بشنو</h4>
                       <p className="text-yellow-500/60 text-[10px] font-black uppercase tracking-widest">Special Curated Narrative</p>
                    </div>

                    <button 
                      onClick={toggleNarrative}
                      className={`w-full py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 transition-all ${isNarrativePlaying ? 'bg-white text-black' : 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20'}`}
                    >
                      {isNarrativePlaying ? <><Square size={20} fill="currentColor" /> توقف داستان</> : <><Play size={20} fill="currentColor" /> پخش داستان صوتی</>}
                    </button>
                  </motion.div>
                )}

                <div className="flex gap-6">
                  <POIMissionAction 
                    poiId={fullDetailPOI.id} 
                    poiName={fullDetailPOI.name} 
                    onInitiated={() => setFullDetailPOI(null)} 
                  />
                  <button 
                    onClick={() => setShowPriceWatch(true)}
                    className="flex-1 glass border-blue-500/20 p-6 rounded-[3rem] flex flex-col items-center gap-3 group active:scale-95 transition-all shadow-xl"
                  >
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:-rotate-12 transition-transform">
                      <Tag size={28} />
                    </div>
                    <span className="text-white font-black text-sm">گزارش قیمت</span>
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-tighter">30 Min Bonus</span>
                  </button>
                </div>

                <div className="flex items-center justify-around glass rounded-[3rem] p-8 border-white/5 bg-white/[0.01]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white font-black text-xl">{fullDetailPOI.footprints?.length || 0}</span>
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Steps</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center gap-1">
                    <Clock size={20} className="text-green-500/80" />
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Open Now</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center gap-1">
                    <Zap size={20} className="text-blue-500/80" />
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Trending</span>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-600/30 z-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <div className="glass p-10 pt-12 rounded-[4rem] border-indigo-500/30 bg-indigo-600/5 transition-all group-hover:bg-indigo-600/10">
                    <p className="text-white font-medium text-right leading-[1.8] text-2xl italic tracking-tight">
                      {vibeCheck ? `"${vibeCheck}"` : "تحلیلگر رهنما در حال بررسی اتمسفر اینجاست..."}
                    </p>
                  </div>
                </div>

                <POIFootprintSection 
                  footprints={fullDetailPOI.footprints || []}
                  comment={comment}
                  isSubmitting={isSubmitting}
                  onCommentChange={setComment}
                  onSubmit={submitFootprint}
                />

                <button className="w-full bg-gradient-to-b from-white to-neutral-200 text-black py-7 rounded-[3.5rem] font-black text-2xl shadow-[0_30px_60px_rgba(255,255,255,0.05)] flex items-center justify-center gap-6 active:scale-[0.98] transition-all">
                  <Waveform size={32} className="text-indigo-600" />
                  <span className="mt-1">راهنمای صوتی لوکس</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPriceWatch && fullDetailPOI && (
          <PriceWatchModal 
            poiId={fullDetailPOI.id} 
            poiName={fullDetailPOI.name} 
            onClose={() => setShowPriceWatch(false)} 
          />
        )}
        
        {isCelebratingStamp && fullDetailPOI && (
          <StampCelebration 
            placeName={fullDetailPOI.name} 
            onComplete={() => setCelebratingStamp(false)} 
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
