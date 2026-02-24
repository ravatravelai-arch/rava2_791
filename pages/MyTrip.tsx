
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Plus } from 'lucide-react';
import { SafeHavenCard } from '../components/wallet/SafeHavenCard';
import { TimelineEvent } from '../components/wallet/TimelineEvent';
import { TicketScanner } from '../components/wallet/TicketScanner';
import { useUserStore } from '../store/useUserStore';

export const MyTrip: React.FC = () => {
  const { tripEvents, wallet } = useUserStore();
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="h-full overflow-y-auto px-6 pb-32 pt-6 no-scrollbar">
      <div className="flex justify-between items-end mb-8">
        <div className="text-right">
          <h2 className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">Trip Status</h2>
          <div className="flex items-center gap-2">
            <span className="text-white text-3xl font-black tracking-tighter">{wallet.xp}</span>
            <span className="text-yellow-500 font-black text-xs uppercase">XP Points</span>
          </div>
        </div>
        <button 
          onClick={() => setShowScanner(true)}
          className="glass p-4 rounded-3xl text-yellow-500 border-yellow-500/20 active:scale-95 transition-transform"
        >
          <ScanLine size={24} />
        </button>
      </div>

      <SafeHavenCard />

      <div className="mt-12">
        <div className="flex justify-between items-center mb-8">
          <button 
             onClick={() => setShowScanner(true)}
             className="p-2 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Plus size={20} />
          </button>
          <h3 className="text-white font-black text-xl">تایم‌لاین سفر شما</h3>
        </div>

        <div className="relative border-r-2 border-dashed border-white/5 mr-4 pr-8 space-y-6 pb-12">
          {tripEvents.length === 0 ? (
             <div className="text-center py-10 opacity-50">
               <p className="text-white/40 text-sm">هنوز برنامه‌ای نچیدی!</p>
             </div>
          ) : (
             tripEvents.map((event, idx) => (
               <TimelineEvent 
                  key={event.id} 
                  event={event} 
                  index={idx} 
                  isLast={idx === tripEvents.length - 1} 
               />
             ))
          )}
          
          <div className="relative opacity-30 pt-4">
             <div className="absolute -right-[43px] top-4 w-3 h-3 rounded-full bg-white/20" />
             <button 
                onClick={() => setShowScanner(true)}
                className="w-full border-2 border-dashed border-white/10 rounded-[2rem] p-6 text-center hover:bg-white/5 transition-colors"
             >
                <p className="text-white/40 text-xs font-bold">+ افزودن برنامه جدید</p>
             </button>
          </div>
        </div>
      </div>

      {showScanner && <TicketScanner onClose={() => setShowScanner(false)} />}
    </div>
  );
};
