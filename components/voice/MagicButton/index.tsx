
import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Zap } from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';
import { useGeminiLive } from '../../../hooks/useGeminiLive';
import { AudioVisualizer } from '../AudioVisualizer';

// Sub-components
import { StatusRing } from './StatusRing';
import { MicTrigger } from './MicTrigger';
import { ControlActions } from './ControlActions';

const motion = _motion as any;

export const MagicButton: React.FC = () => {
  const isRecording = useUIStore(s => s.isRecording);
  const isSpeaking = useUIStore(s => s.isSpeaking);
  const isThinking = useUIStore(s => s.isThinking);
  const showTranscript = useUIStore(s => s.showTranscript);
  const captions = useUIStore(s => s.captions);
  const setShowTranscript = useUIStore(s => s.setShowTranscript);
  
  const { connect, disconnect, interrupt } = useGeminiLive();

  return (
    <div className="fixed bottom-24 left-0 right-0 z-[1500] flex flex-col items-center gap-4 pointer-events-none">
      
      {/* ۱. کپشن‌های زنده */}
      <AnimatePresence>
        {captions.user && isRecording && !isSpeaking && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-[70%] glass px-4 py-2 rounded-xl text-[9px] text-white/50 text-center font-bold shadow-xl"
          >
            شما: {captions.user}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ۲. مشاهده متن */}
      <motion.button
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          setShowTranscript(!showTranscript);
        }}
        className="pointer-events-auto glass px-3 py-1.5 rounded-xl flex items-center gap-2 text-[8px] font-black text-white/30 border-white/5"
      >
        <MessageSquare size={12} />
        {showTranscript ? 'پنهان' : 'متن'}
      </motion.button>

      {/* ۳. وضعیت بصری */}
      <AnimatePresence>
        {(isRecording || isSpeaking || isThinking) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass px-4 py-2 rounded-full flex items-center gap-3 shadow-xl border-white/10"
          >
            {isThinking && !isSpeaking ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                <Zap size={14} className="text-yellow-400" />
              </motion.div>
            ) : (
              <AudioVisualizer isActive={isRecording || isSpeaking} />
            )}
            <span className="text-yellow-400 font-black text-[9px] uppercase tracking-widest">
              {isSpeaking ? 'AI Speaking' : isThinking ? 'Thinking' : 'Listening'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ۴. کانتینر عملیاتی */}
      <div className="relative w-full h-20 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center z-0 scale-75">
          <StatusRing />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <ControlActions onDisconnect={disconnect} onInterrupt={interrupt} />
        </div>

        <div className="relative z-20 pointer-events-auto scale-90">
          <MicTrigger onStart={connect} />
        </div>
      </div>
    </div>
  );
};
