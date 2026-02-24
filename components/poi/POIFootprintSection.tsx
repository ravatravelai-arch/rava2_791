
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Send, Loader2, Footprints as StepsIcon } from 'lucide-react';
import { Footprint } from '../../types';

const motion = _motion as any;

interface POIFootprintSectionProps {
  footprints: Footprint[];
  comment: string;
  isSubmitting: boolean;
  onCommentChange: (val: string) => void;
  onSubmit: () => void;
}

export const POIFootprintSection: React.FC<POIFootprintSectionProps> = ({ 
  footprints, comment, isSubmitting, onCommentChange, onSubmit 
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-neutral-800" />
          ))}
        </div>
        <h4 className="text-white font-black text-2xl flex items-center gap-3">
           ردپای مسافران <StepsIcon size={24} className="text-yellow-500" />
        </h4>
      </div>
      
      <div className="space-y-5">
        {footprints.length === 0 ? (
          <p className="text-white/20 text-center py-6 text-sm font-bold">هنوز کسی اینجا ردپایی نذاشته. اولین نفر باش!</p>
        ) : (
          footprints.map(f => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={f.id} className="flex items-start gap-4 flex-row-reverse">
              <div className="w-11 h-11 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg">
                {f.user[0]}
              </div>
              <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[2rem] rounded-tr-none text-right flex-1 shadow-sm">
                <div className="flex justify-between items-center mb-2 flex-row-reverse">
                  <span className="text-yellow-500 font-black text-xs">{f.user}</span>
                  <span className="text-white/20 text-[9px] font-bold">{f.date}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed font-medium">{f.text}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      <div className="relative mt-4">
        <input 
          type="text" placeholder="تجربه‌ت رو اینجا ثبت کن..."
          value={comment} onChange={(e) => onCommentChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          className="w-full bg-white/5 border border-white/10 rounded-[2.2rem] py-5 pr-7 pl-16 text-white text-right outline-none focus:border-yellow-500/40 transition-all text-sm font-medium"
        />
        <button 
          onClick={onSubmit}
          disabled={isSubmitting || !comment.trim()}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black active:scale-90 transition-all shadow-xl disabled:opacity-30"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={22} />}
        </button>
      </div>
    </div>
  );
};
