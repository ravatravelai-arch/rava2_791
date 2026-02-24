import React from 'react';
import { motion as _motion } from 'framer-motion';
import { MailCheck, ArrowRight, RefreshCw } from 'lucide-react';

const motion = _motion as any;

interface VerificationSentStepProps {
  email: string;
  onBack: () => void;
  onLogin?: () => void; // پراپ جدید برای هدایت به لاگین
}

export const VerificationSentStep: React.FC<VerificationSentStepProps> = ({ email, onBack, onLogin }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-8 text-center"
  >
    <div className="relative mx-auto w-24 h-24">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"
      />
      <div className="relative w-24 h-24 bg-green-500 rounded-[2.5rem] flex items-center justify-center text-black shadow-[0_20px_40px_rgba(34,197,94,0.3)]">
        <MailCheck size={48} />
      </div>
    </div>

    <div className="space-y-3">
      <h2 className="text-2xl font-black text-white">ایمیل رو چک کن رفیق!</h2>
      <p className="text-white/40 text-sm leading-relaxed">
        یه لینک تایید فرستادیم به <span className="text-green-400 font-mono">{email}</span>. 
        بزن روش تا سفرمون رو شروع کنیم.
      </p>
    </div>

    <div className="pt-4 space-y-4">
      <button
        onClick={onLogin || (() => window.location.reload())}
        className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
      >
        <span>تایید کردم، ورود</span>
        <ArrowRight size={20} />
      </button>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/30 font-black text-xs mx-auto hover:text-white transition-colors"
      >
        <RefreshCw size={14} /> تغییر ایمیل یا ارسال مجدد
      </button>
    </div>
  </motion.div>
);