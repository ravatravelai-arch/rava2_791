
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { MapPin, Heart, MessageCircle } from 'lucide-react';
import { POI } from '../../types';
import { useMapStore } from '../../store/useMapStore';
import { useUIStore } from '../../store/useUIStore';
import { AudioGraph } from '../../services/audioGraph';
import { getOptimizedImageUrl } from '../../utils/helpers';

const motion = _motion as any;

interface VibeCardProps {
  place: POI;
  index: number;
}

// کامپوننت داخلی برای نمایش آیکون سه بعدی در صورت نبود عکس
const FallbackIcon = ({ category }: { category: string }) => {
  const size = "text-6xl";
  const c = category?.toLowerCase() || '';
  let icon = '📍';
  
  if (c.includes('restaurant') || c.includes('food')) icon = '🍱';
  else if (c.includes('cafe') || c.includes('coffee')) icon = '☕';
  else if (c.includes('shopping') || c.includes('store') || c.includes('mall')) icon = '🛍️';
  else if (c.includes('park') || c.includes('nature')) icon = '🌳';
  else if (c.includes('museum') || c.includes('historical') || c.includes('mosque')) icon = '🕌';
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center rounded-[3.5rem]">
      <span className={`${size} drop-shadow-2xl grayscale-[0.3]`}>{icon}</span>
    </div>
  );
};

export const VibeCard: React.FC<VibeCardProps> = ({ place, index }) => {
  const { setActivePOI, setFullDetailPOI } = useMapStore();
  const { setActiveTab } = useUIStore();

  const handleOpenDetails = () => {
    AudioGraph.getInstance().playTickSound();
    AudioGraph.haptic(10);
    setActivePOI(place);
    setFullDetailPOI(place);
  };

  const handleShowOnMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    AudioGraph.getInstance().playTickSound();
    setActivePOI(place);
    setActiveTab('home');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }}
      onClick={handleOpenDetails}
      className="relative h-[500px] rounded-[3.5rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/5 mb-8 cursor-pointer transform transition-transform active:scale-[0.98]"
    >
      <div className="absolute inset-0">
        {place.image ? (
          <motion.img 
            layoutId={`img-${place.id}`}
            src={getOptimizedImageUrl(place.image, 800)} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
            alt={place.name}
            loading="lazy"
          />
        ) : (
          <FallbackIcon category={place.category} />
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
      
      <div className="absolute top-8 right-8">
        <span className="glass px-6 py-2.5 rounded-full text-white text-[9px] font-black border-white/10 uppercase tracking-[0.15em] backdrop-blur-md shadow-lg">
          {place.category?.replace('_', ' ') || 'مکان خاص'}
        </span>
      </div>

      <div className="absolute bottom-10 left-8 right-8 text-right">
        {/* Only animate layout for the title to sync with details page */}
        <motion.h4 
          layoutId={`title-${place.id}`}
          className="text-white text-3xl font-black mb-4 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
        >
          {place.name}
        </motion.h4>
        
        <p className="text-white/70 text-sm mb-6 line-clamp-2 leading-relaxed font-medium pl-4">
          {place.description}
        </p>
        
        <div className="flex justify-between items-center border-t border-white/10 pt-5">
          <div className="flex gap-6">
            <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold">
              <Heart size={16} /> ۳۴۰
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold">
              <MessageCircle size={16} /> ۱۲
            </div>
          </div>
          
          <button 
            onClick={handleShowOnMap}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-wider backdrop-blur-md transition-colors"
          >
            <MapPin size={14} /> مشاهده در نقشه
          </button>
        </div>
      </div>
    </motion.div>
  );
};
