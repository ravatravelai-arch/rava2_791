
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Loader2, ZoomIn, ZoomOut, Maximize2, X, Navigation2, Zap } from 'lucide-react';
import { GlassCard } from '../core/GlassCard';
import { useUserStore } from '../../store/useUserStore';
import { useMapStore } from '../../store/useMapStore';
import { useSurvivalStore } from '../../store/useSurvivalStore';
import { SUBWAY_STATIONS } from '../../constants';
import { calculateDistance } from '../../utils/geoUtils';
import { GeoPoint } from '../../utils/geoPoint';
import { AudioGraph } from '../../services/audioGraph';

const motion = _motion as any;

export const SubwayMap: React.FC = () => {
  const { cityMode } = useUserStore();
  const { userLocation } = useMapStore();
  const { isMapFullscreen, setMapFullscreen } = useSurvivalStore();
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const mapUrls = {
    Istanbul: "https://www.metro.istanbul/Content/assets/img/rayli-sistemler-haritasi.png",
    Dubai: "https://www.visitdubai.com/-/media/gathercontent/article/d/dubai-metro-guide/media/dubai-metro-guide-dubai-metro-map-1.jpg"
  };

  const currentMap = cityMode ? mapUrls[cityMode] : null;

  // محاسبه هوشمند نزدیک‌ترین ایستگاه
  const nearestStation = useMemo(() => {
    const geo = GeoPoint.fromArray(userLocation);
    if (!geo || !cityMode || !SUBWAY_STATIONS[cityMode]) return null;

    const stations = SUBWAY_STATIONS[cityMode];
    let closest = stations[0];
    let minDistance = Infinity;

    stations.forEach(st => {
      const dist = calculateDistance(geo.lat, geo.lng, st.lat, st.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closest = st;
      }
    });

    return { ...closest, distance: Math.round(minDistance) };
  }, [userLocation, cityMode]);

  const handleZoom = (dir: 'in' | 'out') => {
    AudioGraph.getInstance().playTickSound();
    setScale(prev => {
      const next = dir === 'in' ? prev + 0.5 : prev - 0.5;
      return Math.max(1, Math.min(5, next));
    });
  };

  const toggleFullscreen = () => {
    AudioGraph.haptic(20);
    setMapFullscreen(!isMapFullscreen);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">High-Res Offline Data</span>
        <h4 className="text-white font-black text-lg flex items-center gap-2">
          نقشه مترو <MapIcon size={16} className="text-indigo-500" />
        </h4>
      </div>

      <AnimatePresence>
        {nearestStation && nearestStation.distance < 3000 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="px-2"
          >
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg animate-pulse">
                    <Navigation2 size={20} />
                 </div>
                 <div className="text-right">
                    <p className="text-white font-black text-xs">{nearestStation.name}</p>
                    <p className="text-indigo-400 text-[9px] font-bold uppercase tracking-tighter">نزدیک‌ترین ایستگاه به شما • {nearestStation.distance} متر</p>
                 </div>
              </div>
              <Zap size={14} className="text-indigo-500/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard className="p-0 overflow-hidden relative group aspect-square border-indigo-500/20" ref={containerRef}>
        {!currentMap ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 py-20 opacity-20">
            <MapIcon size={64} />
            <p className="text-xs font-black">نقشه برای این شهر در دسترس نیست</p>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-4"
                >
                  <Loader2 size={32} className="text-indigo-500 animate-spin" />
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">در حال دریافت نقشه بقا...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full h-full relative overflow-hidden bg-neutral-900">
              <motion.div
                drag
                dragConstraints={containerRef}
                animate={{ scale }}
                className="w-full h-full flex items-center justify-center cursor-move"
              >
                <img 
                  src={currentMap} 
                  onLoad={() => setIsLoading(false)}
                  className="max-w-none w-[1200px] h-auto pointer-events-none" 
                  alt="Subway Map"
                />
              </motion.div>
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => handleZoom('in')} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"><ZoomIn size={20} /></button>
               <button onClick={() => handleZoom('out')} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"><ZoomOut size={20} /></button>
               <button onClick={toggleFullscreen} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500 active:scale-90 transition-transform shadow-lg"><Maximize2 size={20} /></button>
            </div>
          </>
        )}
      </GlassCard>

      <AnimatePresence>
        {isMapFullscreen && currentMap && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[8000] bg-black"
          >
            <div className="absolute top-12 left-8 z-50 flex items-center gap-4">
              <button onClick={toggleFullscreen} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform"><X size={32} /></button>
              <div className="glass px-4 py-2 rounded-xl text-white/60 text-[10px] font-black uppercase">Subway Master View</div>
            </div>
            <div className="w-full h-full overflow-hidden">
               <motion.div 
                 drag 
                 dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
                 initial={{ scale: 1.8 }}
                 className="w-full h-full flex items-center justify-center"
               >
                 <img src={currentMap} className="max-w-none w-[2000px]" alt="Subway Full" />
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
