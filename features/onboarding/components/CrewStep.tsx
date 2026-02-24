
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../../components/core/GlassCard';

const motion = _motion as any;

const CREWS = [
  { id: 'solo', label: 'تنهایی', icon: '👤' },
  { id: 'couple', label: 'دو نفره', icon: '👩‍❤️‍👨' },
  { id: 'family', label: 'با خانواده', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'با رفقا', icon: '👯‍♂️' }
];

interface CrewStepProps {
  selectedCrew: string | null;
  loading: boolean;
  onSelect: (crew: string) => void;
  onBack: () => void;
  onFinalize: () => void;
}

export const CrewStep: React.FC<CrewStepProps> = ({ selectedCrew, loading, onSelect, onBack, onFinalize }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 20 }} 
    className="space-y-10"
  >
    <div className="text-right space-y-2">
      <h1 className="text-4xl font-black text-white leading-tight">با کیا همسفری؟</h1>
      <p className="text-white/40 text-sm font-bold">اینطوری می‌تونم پیشنهادهای بهتری بدم.</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {CREWS.map(crew => (
        <button key={crew.id} onClick={() => onSelect(crew.id)} className="outline-none">
          <GlassCard className={`flex flex-col items-center justify-center gap-4 py-10 border-white/5 transition-all duration-500 ${selectedCrew === crew.id ? 'bg-yellow-500/10 border-yellow-500/50 scale-[1.05] shadow-[0_20px_40px_rgba(234,179,8,0.1)]' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}>
            <span className="text-4xl">{crew.icon}</span>
            <span className={`font-black text-xs transition-colors ${selectedCrew === crew.id ? 'text-yellow-500' : 'text-white'}`}>{crew.label}</span>
          </GlassCard>
        </button>
      ))}
    </div>
    
    <div className="pt-10 space-y-6">
      <button 
        onClick={onFinalize}
        disabled={loading || !selectedCrew}
        className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] transition-all disabled:opacity-20"
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : (
          <>
            <span className="mt-1">آماده‌سازی سفر لوکس</span>
            <Sparkles size={24} className="text-yellow-500" />
          </>
        )}
      </button>

      <button onClick={onBack} className="flex items-center gap-2 text-white/20 font-black text-[10px] uppercase tracking-widest mx-auto hover:text-white transition-colors group">
        <span>مرحله قبل</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </motion.div>
);
