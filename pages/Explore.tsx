
import React, { useEffect } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { Trophy, Camera, ArrowLeft, Loader2, Compass } from 'lucide-react';
import { GlassCard } from '../components/core/GlassCard';
import { VibeCard } from '../components/discovery/VibeCard';
import { DailyCurator } from '../components/discovery/DailyCurator';
import { useMissionStore } from '../store/useMissionStore';
import { useUIStore } from '../store/useUIStore';
import { useDiscoveryStore } from '../store/useDiscoveryStore';
import { useMapStore } from '../store/useMapStore';
import { GeoPoint } from '../utils/geoPoint';

const motion = _motion as any;

const MOODS = [
  { id: 'luxury', label: 'پولدار طور', icon: '🤑' },
  { id: 'budget', label: 'مفت گردی', icon: '🎒' },
  { id: 'instagrammable', label: 'خوراک استوری', icon: '📸' },
  { id: 'hidden_gem', label: 'مخفیگاه', icon: '🕵️' },
];

export const Explore: React.FC = () => {
  const { activeMissions } = useMissionStore();
  const { setShowVision, setActiveTab } = useUIStore();
  const { discoveredPlaces, isSearching, activeMood, setActiveMood, refreshFeed } = useDiscoveryStore();
  const userLocation = useMapStore(s => s.userLocation);

  useEffect(() => {
    // پیاده‌سازی پروتکل GeoPoint برای ایمنی مختصات
    const geo = GeoPoint.fromArray(userLocation);
    if (geo && discoveredPlaces.length === 0) {
      refreshFeed(geo.lat, geo.lng);
    }
  }, [userLocation, refreshFeed, discoveredPlaces.length]);

  const handleMoodClick = (moodId: string) => {
    const newMood = activeMood === moodId ? null : moodId;
    setActiveMood(newMood);
    const geo = GeoPoint.fromArray(userLocation);
    if (geo) {
      refreshFeed(geo.lat, geo.lng);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-6 pb-44 pt-6 no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setActiveTab('home')} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40">
           <ArrowLeft size={18} />
        </button>
        <div className="text-right">
           <h2 className="text-2xl font-black text-white">کشف شهر</h2>
           <p className="text-white/30 text-[10px] font-bold uppercase tracking-tighter">AI-Powered Discovery</p>
        </div>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {MOODS.map((mood) => (
          <button 
            key={mood.id} 
            onClick={() => handleMoodClick(mood.id)}
            className={`glass px-6 py-3 rounded-full text-xs font-black whitespace-nowrap border-white/5 transition-all flex items-center gap-2 ${
              activeMood === mood.id ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'text-white/60 hover:border-yellow-500/30'
            }`}
          >
            <span>{mood.icon}</span>
            {mood.label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        <DailyCurator />

        <AnimatePresence>
          {activeMissions.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <h4 className="text-yellow-500 font-black text-sm mb-4 flex items-center gap-2">
                <Trophy size={16} /> مأموریت‌های فعال شما
              </h4>
              <div className="space-y-3">
                {activeMissions.map(mission => (
                  <GlassCard key={mission.id} className="bg-yellow-500/10 border-yellow-500/30 py-4 flex justify-between items-center">
                    <div className="text-right">
                      <h5 className="text-white font-black text-sm">{mission.title}</h5>
                      <p className="text-white/40 text-[9px] mt-1">{mission.description}</p>
                    </div>
                    <button onClick={() => setShowVision(true)} className="bg-yellow-500 p-3 rounded-xl text-black shadow-lg">
                      <Camera size={18} />
                    </button>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-[400px] relative">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 size={32} className="text-yellow-500 animate-spin" />
               <p className="text-white/40 font-bold text-sm">در حال رصد اتمسفر شهر...</p>
            </div>
          ) : discoveredPlaces.length > 0 ? (
            discoveredPlaces.map((place, idx) => (
              <VibeCard key={place.id} place={place} index={idx} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-6 opacity-30">
               <Compass size={64} />
               <div className="text-center">
                 <p className="text-white font-black text-lg">این منطقه هنوز بکر است!</p>
                 <p className="text-white/60 text-xs">اولین نفری باش که اینجا ردپا می‌ذاره</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
