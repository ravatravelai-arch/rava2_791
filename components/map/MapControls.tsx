
import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Navigation, Layers } from 'lucide-react';
import { useDiscoveryStore } from '../../store/useDiscoveryStore';
import { useMapStore } from '../../store/useMapStore';
import { useMap } from '@vis.gl/react-google-maps';
import { AudioGraph } from '../../services/audioGraph';

const motion = _motion as any;

export const MapControls: React.FC = () => {
  const map = useMap();
  const { showCurated, toggleShowCurated } = useDiscoveryStore();
  const { userLocation } = useMapStore();

  const handleToggle = () => {
    AudioGraph.getInstance().playTickSound();
    AudioGraph.haptic(10);
    toggleShowCurated();
  };

  const handleRecenter = () => {
    if (!map || !userLocation) return;
    AudioGraph.getInstance().playTickSound();
    map.panTo({ lat: userLocation[0], lng: userLocation[1] });
    map.setZoom(15);
  };

  return (
    <div className="absolute left-6 top-24 z-[1000] flex flex-col gap-4">
      {/* دکمه لایه هوشمند رهنما */}
      <button 
        onClick={handleToggle}
        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 border shadow-2xl relative group ${
          showCurated 
          ? 'bg-yellow-500 border-yellow-400 text-black shadow-[0_0_30px_rgba(234,179,8,0.4)]' 
          : 'bg-black/40 backdrop-blur-xl border-white/10 text-white/40 hover:text-white hover:border-white/20'
        }`}
      >
        <Sparkles size={22} className={showCurated ? 'animate-pulse' : ''} />
        <span className="text-[7px] font-black mt-1 uppercase tracking-tighter">Gems</span>
        
        {/* Tooltip اختصاصی */}
        <div className="absolute right-full mr-4 glass px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
           <span className="text-white text-[9px] font-bold">نمایش لایه رهنما</span>
        </div>
      </button>

      {/* دکمه موقعیت من */}
      <button 
        onClick={handleRecenter}
        className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-white/60 hover:text-white active:scale-90 transition-all shadow-2xl"
      >
        <Navigation size={22} />
        <span className="text-[7px] font-black mt-1 uppercase tracking-tighter">Locate</span>
      </button>

      {/* دکمه تغییر نوع نقشه (Placeholder برای فازهای بعدی) */}
      <button 
        className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-white/20 cursor-not-allowed"
      >
        <Layers size={22} />
        <span className="text-[7px] font-black mt-1 uppercase tracking-tighter">Hybrid</span>
      </button>
    </div>
  );
};
