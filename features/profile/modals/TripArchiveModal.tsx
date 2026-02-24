
import React, { useMemo } from 'react';
import { motion as _motion } from 'framer-motion';
import { X, History, MapPin, Calendar, Milestone, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../../components/core/GlassCard';
import { useUserStore } from '../../../store/useUserStore';

const motion = _motion as any;

interface TripArchiveModalProps {
  onClose: () => void;
}

export const TripArchiveModal: React.FC<TripArchiveModalProps> = ({ onClose }) => {
  const { tripEvents } = useUserStore();

  // فیلتر کردن سفرهایی که تاریخشان گذشته است
  const pastEvents = useMemo(() => {
    const now = new Date();
    return tripEvents.filter(e => new Date(e.date) < now).sort((a, b) => b.date.localeCompare(a.date));
  }, [tripEvents]);

  return (
    <div className="fixed inset-0 z-[6000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg h-[85vh] flex flex-col">
        <GlassCard className="border-white/5 p-10 rounded-[4rem] flex-1 flex flex-col relative overflow-hidden">
          <button onClick={onClose} className="absolute top-8 left-8 text-white/20"><X size={24} /></button>

          <div className="flex flex-col items-center gap-2 mb-12 shrink-0">
            <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <History size={32} />
            </div>
            <h3 className="text-3xl font-black text-white">میراث سفرها</h3>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">Historical Journey Logs</p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pr-4 border-r border-white/5">
            {pastEvents.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-10 gap-6">
                <Milestone size={80} strokeWidth={1} />
                <p className="text-sm font-black uppercase text-center">هنوز میراثی ثبت نشده رفیق!</p>
              </div>
            ) : (
              <div className="space-y-12 pb-10">
                {pastEvents.map((event, idx) => (
                  <div key={event.id} className="relative group">
                    <div className="absolute -right-[41px] top-1 w-4 h-4 rounded-full bg-blue-500/20 border-4 border-[#050505] z-10" />
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-blue-400 mb-2">
                         <span className="text-[10px] font-black uppercase tracking-widest">{new Date(event.date).toLocaleDateString('fa-IR', { month: 'long', year: 'numeric' })}</span>
                         <Calendar size={12} />
                      </div>
                      <h4 className="text-white font-black text-xl mb-2">{event.title}</h4>
                      <p className="text-white/40 text-xs font-medium leading-relaxed">{event.details.address || 'ماجراجویی در سطح شهر'}</p>
                      
                      <div className="mt-4 flex justify-end">
                        <div className="glass px-4 py-2 rounded-2xl border-white/5 flex items-center gap-2 text-[10px] font-black text-white/60">
                           <MapPin size={12} /> مشاهده جزئیات آرشیوی
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] shrink-0">
             <p className="text-[10px] text-white/40 leading-relaxed text-right font-bold italic">
               "سفر تنها چیزی است که با هزینه کردن آن، ثروتمندتر می‌شوید."
             </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
