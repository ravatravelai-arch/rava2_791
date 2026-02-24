
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

const motion = _motion as any;

interface EmailStepProps {
  email: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, onChange, onSubmit }) => (
  <motion.form
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    onSubmit={onSubmit}
    className="space-y-8"
  >
    <div className="text-right space-y-2">
      <h2 className="text-2xl font-black text-white">خوش اومدی!</h2>
      <p className="text-white/40 text-xs font-bold leading-relaxed">برای شروع سفر، ایمیلت رو وارد کن رفیق.</p>
    </div>

    <div className="relative group">
      <input
        type="email"
        required
        dir="ltr"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="example@mail.com"
        className="w-full bg-white/[0.02] border border-white/10 rounded-[1.5rem] py-5 px-6 text-white text-left outline-none focus:border-yellow-500/40 focus:bg-white/[0.05] transition-all font-mono text-sm"
      />
      <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-yellow-500/40 transition-colors" size={18} />
    </div>

    <button
      type="submit"
      className="w-full bg-white text-black py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
    >
      <span>ادامه مسیر</span>
      <ArrowLeft size={20} className="mt-0.5" />
    </button>
  </motion.form>
);
