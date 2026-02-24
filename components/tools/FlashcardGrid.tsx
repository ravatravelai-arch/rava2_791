
import React from 'react';
// Fix for Framer Motion type resolution issues in the current environment
import { motion as _motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { GlassCard } from '../core/GlassCard';
import { FLASHCARDS_DATA } from '../../constants';
import { useSurvivalStore } from '../../store/useSurvivalStore';
import { useUserStore } from '../../store/useUserStore';

const motion = _motion as any;

export const FlashcardGrid: React.FC = () => {
  const { setActiveFlashcard } = useSurvivalStore();
  const { cityMode } = useUserStore();
  
  const flashcards = cityMode ? FLASHCARDS_DATA[cityMode] : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Tap to show driver/local</span>
        <h4 className="text-white font-black text-lg flex items-center gap-2">
          جملات ضروری <Zap size={16} className="text-yellow-500" />
        </h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {flashcards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GlassCard 
              onClick={() => setActiveFlashcard(card)}
              className="flex flex-col items-center justify-center gap-4 py-8 border-white/5 active:scale-95 transition-all cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{card.icon}</span>
              <div className="text-center space-y-1">
                <span className="text-white font-black text-[10px] block">{card.farsi}</span>
                <span className="text-white/40 text-[8px] font-bold uppercase tracking-tighter">{card.category}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
