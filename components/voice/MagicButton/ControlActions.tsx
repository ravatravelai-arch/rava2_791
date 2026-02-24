
import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { X, Hand } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

const motion = _motion as any;

interface ControlActionsProps {
  onDisconnect: () => void;
  onInterrupt: () => void;
}

export const ControlActions: React.FC<ControlActionsProps> = ({ onDisconnect, onInterrupt }) => {
  const isRecording = useUIStore(s => s.isRecording);
  const isSpeaking = useUIStore(s => s.isSpeaking);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {isSpeaking && (
          <motion.button
            key="interrupt"
            initial={{ opacity: 0, x: 0, scale: 0.5 }}
            animate={{ opacity: 1, x: -85, scale: 1 }}
            exit={{ opacity: 0, x: 0, scale: 0.5 }}
            onClick={onInterrupt}
            className="absolute w-14 h-14 rounded-2xl bg-indigo-600 flex flex-col items-center justify-center text-white shadow-xl border border-white/20 active:scale-90 transition-all pointer-events-auto"
          >
            <Hand size={18} />
            <span className="text-[7px] font-black mt-1 uppercase">بزن وسطش</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRecording && (
          <motion.button
            key="disconnect"
            initial={{ opacity: 0, x: 0, scale: 0.5 }}
            animate={{ opacity: 1, x: 85, scale: 1 }}
            exit={{ opacity: 0, x: 0, scale: 0.5 }}
            onClick={onDisconnect}
            className="absolute w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex flex-col items-center justify-center text-red-500 shadow-xl active:scale-90 pointer-events-auto"
          >
            <X size={18} />
            <span className="text-[7px] font-black mt-1 uppercase">قطع تماس</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
