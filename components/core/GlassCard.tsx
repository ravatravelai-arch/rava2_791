
import React, { forwardRef } from 'react';
import { motion as _motion } from 'framer-motion';

const motion = _motion as any;

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  layoutId?: string;
}

// استفاده از forwardRef برای اجازه دادن به کامپوننت‌های والد جهت دسترسی به DOM نود اصلی
// این تغییر برای رفع خطای تایپ در بخش نقشه مترو که از ref برای dragConstraints استفاده می‌کند، ضروری است
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', onClick, layoutId }, ref) => {
    return (
      <motion.div
        ref={ref}
        layoutId={layoutId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={onClick}
        className={`glass rounded-[3rem] p-7 luxury-shadow backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
