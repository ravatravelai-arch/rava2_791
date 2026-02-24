
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin } from 'lucide-react';

const motion = _motion as any;

interface POIHeaderProps {
  id: string;
  name: string;
  image?: string;
  rating?: number;
  category?: string;
  onBack: () => void;
}

const Category3DIcon = ({ category, size = "text-5xl" }: { category: string, size?: string }) => {
  const c = category?.toLowerCase() || '';
  if (c.includes('restaurant') || c.includes('food')) return <span className={`${size} drop-shadow-2xl`}>🍱</span>;
  if (c.includes('cafe') || c.includes('coffee')) return <span className={`${size} drop-shadow-2xl`}>☕</span>;
  if (c.includes('shopping') || c.includes('store') || c.includes('mall')) return <span className={`${size} drop-shadow-2xl`}>🛍️</span>;
  if (c.includes('park') || c.includes('nature')) return <span className={`${size} drop-shadow-2xl`}>🌳</span>;
  if (c.includes('museum') || c.includes('historical') || c.includes('church') || c.includes('mosque')) return <span className={`${size} drop-shadow-2xl`}>🕌</span>;
  return <span className={`${size} drop-shadow-2xl`}>📍</span>;
};

export const POIHeader: React.FC<POIHeaderProps> = ({ id, name, image, rating, category, onBack }) => {
  return (
    <div className="relative h-[55vh] w-full overflow-hidden">
      <motion.div 
        layoutId={`img-${id}`}
        className="absolute inset-0"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {image ? (
          <img 
            src={image} className="w-full h-full object-cover" alt={name} 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111] to-black flex flex-col items-center justify-center">
            <Category3DIcon category={category || ''} size="text-9xl" />
          </div>
        )}
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
      
      <button 
        onClick={onBack} 
        className="absolute top-12 left-8 w-14 h-14 glass rounded-3xl text-white/80 flex items-center justify-center active:scale-90 transition-all z-30 shadow-2xl"
      >
        <ArrowLeft size={28} />
      </button>

      <div className="absolute bottom-12 right-12 left-12 text-right z-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="flex justify-end gap-3 mb-6"
         >
          {rating && (
            <div className="bg-yellow-500 text-black px-5 py-2 rounded-full text-[12px] font-black flex items-center gap-2 shadow-2xl">
              <Star size={14} fill="currentColor" /> {rating}
            </div>
          )}
          <div className="glass px-5 py-2 rounded-full text-white/90 text-[11px] font-black border-white/20 uppercase tracking-[0.2em] backdrop-blur-3xl">
            {category?.replace('_', ' ') || 'EXPLORE'}
          </div>
        </motion.div>
        
        <motion.h2 
          layoutId={`title-${id}`}
          className="text-6xl font-black text-white leading-[1.1] drop-shadow-[0_20px_40px_rgba(0,0,0,1)]"
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h2>
      </div>
    </div>
  );
};
