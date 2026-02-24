
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';

const motion = _motion as any;

interface AudioVisualizerProps {
  isActive: boolean; // این پارامتر برای سازگاری نگه داشته شده اما منطق داخلی از isUserTalking استفاده می‌کند
  color?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ color = '#eab308' }) => {
  const isUserTalking = useUIStore(s => s.isUserTalking);
  const isSpeaking = useUIStore(s => s.isSpeaking);
  
  const bars = Array.from({ length: 12 });
  const active = isUserTalking || isSpeaking;

  return (
    <div className="flex items-end justify-center gap-1 h-12 w-32">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: active ? [12, 40, 12, 32, 12] : 4,
            transition: {
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut"
            }
          }}
          style={{ backgroundColor: color }}
          className="w-1.5 rounded-full"
        />
      ))}
    </div>
  );
};
