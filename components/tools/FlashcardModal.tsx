
import React from 'react';
// Fix for Framer Motion type resolution issues in the current environment
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Languages } from 'lucide-react';
import { Flashcard } from '../../types';
import { ttsService } from '../../services/survival/ttsService';
import { useUserStore } from '../../store/useUserStore';

const motion = _motion as any;

interface FlashcardModalProps {
  card: Flashcard | null;
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ card, onClose }) => {
  const cityMode = useUserStore(s => s.cityMode);

  if (!card) return null;

  const handleSpeak = () => {
    const lang = cityMode === 'Istanbul' ? 'tr-TR' : 'ar-AE';
    ttsService.speak(card.local, lang);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[6000] bg-black flex flex-col p-8 text-center justify-between"
      >
        <div className="flex justify-between items-center">
          <div className="glass px-4 py-2 rounded-full border-white/10 flex items-center gap-2">
            <Languages size={14} className="text-yellow-500" />
            <span className="text-white/60 text-[10px] font-black uppercase tracking-tighter">Emergency Communication</span>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-yellow-500/60 font-bold text-xl uppercase tracking-widest">{card.farsi}</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight break-words" dir="ltr">
              {card.local}
            </h2>
          </div>
          <div className="glass p-4 rounded-2xl inline-block mx-auto border-white/5">
            <p className="text-white/40 text-sm italic">تلفظ: {card.pronunciation}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center mb-12">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            className="w-32 h-32 rounded-[3rem] bg-yellow-500 flex items-center justify-center text-black shadow-[0_20px_50px_rgba(234,179,8,0.4)]"
          >
            <Volume2 size={56} />
          </motion.button>
          <p className="text-white font-black text-lg">پخش صوتی برای طرف مقابل</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
