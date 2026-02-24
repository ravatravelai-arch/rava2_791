
import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { WifiOff, CloudOff } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

const motion = _motion as any;

export const OfflineIndicator: React.FC = () => {
  const isOnline = useUserStore(s => s.isOnline);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2 glass bg-red-500/10 border-red-500/30 px-4 py-1.5 rounded-full"
        >
          <div className="relative">
            <WifiOff size={14} className="text-red-500" />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 text-red-400"
            >
              <CloudOff size={14} />
            </motion.div>
          </div>
          <span className="text-red-500 text-[9px] font-black uppercase tracking-tighter">Offline Mode</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
