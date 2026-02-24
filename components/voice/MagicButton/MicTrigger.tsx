
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Mic, Loader2, AudioWaveform as Waveform } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';

const motion = _motion as any;

interface MicTriggerProps {
  onStart: () => void;
}

export const MicTrigger: React.FC<MicTriggerProps> = ({ onStart }) => {
  const isRecording = useUIStore(s => s.isRecording);
  const isConnecting = useUIStore(s => s.isConnecting);
  const isSpeaking = useUIStore(s => s.isSpeaking);

  const buttonStyles = isRecording 
    ? (isSpeaking ? 'bg-blue-600 ring-2 ring-blue-500/20' : 'bg-white/5 ring-2 ring-white/5') 
    : 'bg-yellow-500 ring-4 ring-yellow-500/10 pulse-gold';

  return (
    <motion.button
      onClick={isRecording ? undefined : onStart}
      disabled={isConnecting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl relative z-10 pointer-events-auto ${buttonStyles}`}
    >
      {isConnecting ? (
        <Loader2 size={24} className="text-black animate-spin" />
      ) : isRecording ? (
         <div className="flex items-center gap-1">
            {isSpeaking ? (
               <Waveform size={20} className="text-white animate-pulse" />
            ) : (
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            )}
         </div>
      ) : (
        <Mic size={24} className="text-black" />
      )}
    </motion.button>
  );
};
