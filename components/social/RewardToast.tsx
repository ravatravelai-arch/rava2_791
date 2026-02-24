
import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

const motion = _motion as any;

export const RewardToast: React.FC = () => {
  const rewardNotify = useUIStore(s => s.rewardNotify);

  return (
    <AnimatePresence>
      {rewardNotify?.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="fixed top-24 left-6 right-6 z-[6000] pointer-events-none"
        >
          <div className="glass bg-yellow-500/90 border-yellow-400 p-6 rounded-[2.5rem] shadow-[0_20px_60px_rgba(234,179,8,0.4)] flex items-center gap-4">
             <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-yellow-500 shadow-xl">
                <Zap size={28} fill="currentColor" />
             </div>
             <div className="text-right flex-1">
                <p className="text-black font-black text-xs uppercase tracking-tighter flex items-center gap-1 justify-end">
                   Reward Received <Sparkles size={10} />
                </p>
                <h4 className="text-black font-black text-lg leading-tight">
                   {rewardNotify.amount} واریز شد!
                </h4>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
