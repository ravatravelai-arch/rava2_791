
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GlassCard } from '../../../components/core/GlassCard';

const motion = _motion as any;

const VIBES = [
  { id: 'luxury', label: 'پولدار طور', icon: '🤑', desc: 'بهترین هتل‌ها و رستوران‌های خاص' },
  { id: 'budget', label: 'مفت گردی', icon: '🎒', desc: 'تجربه‌های باحال با کمترین هزینه' },
  { id: 'hidden_gem', label: 'کشف ناشناخته‌ها', icon: '🕵️', desc: 'جاهایی که توریست‌ها نمیشناسن' },
  { id: 'instagrammable', label: 'خوراک استوری', icon: '📸', desc: 'زیباترین لوکیشن‌ها برای عکاسی' }
];

interface VibeStepProps {
  selectedVibe: string | null;
  onSelect: (vibe: string) => void;
  onBack: () => void;
}

export const VibeStep: React.FC<VibeStepProps> = ({ selectedVibe, onSelect, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 20 }} 
    className="space-y-10"
  >
    <div className="text-right space-y-2">
      <h1 className="text-4xl font-black text-white leading-tight">فازِ سفرت چیه؟</h1>
      <p className="text-white/40 text-sm font-bold">دوست داری چطور بگذره؟</p>
    </div>

    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[55vh] pr-2 no-scrollbar pb-10">
      {VIBES.map(vibe => (
        <button key={vibe.id} onClick={() => onSelect(vibe.id)} className="w-full text-right outline-none">
          <GlassCard className={`flex items-center justify-between p-6 border-white/5 active:scale-[0.98] transition-all duration-300 ${selectedVibe === vibe.id ? 'bg-yellow-500/10 border-yellow-500/30 ring-1 ring-yellow-500/20' : 'hover:border-white/10'}`}>
            <span className="text-4xl drop-shadow-xl">{vibe.icon}</span>
            <div className="text-right flex-1 pr-6">
              <h3 className={`text-xl font-black transition-colors ${selectedVibe === vibe.id ? 'text-yellow-500' : 'text-white'}`}>{vibe.label}</h3>
              <p className="text-white/30 text-[10px] font-bold mt-1 uppercase tracking-tighter">{vibe.desc}</p>
            </div>
          </GlassCard>
        </button>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4">
      <button onClick={onBack} className="flex items-center gap-2 text-white/20 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors group">
        <span>مرحله قبل</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
      <div className="flex items-center gap-2 text-yellow-500/20">
         <Sparkles size={16} />
         <div className="w-8 h-px bg-current" />
      </div>
    </div>
  </motion.div>
);
