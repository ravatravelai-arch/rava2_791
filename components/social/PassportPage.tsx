
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Award, Star, MapPin, Milestone, Zap, Globe } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

const motion = _motion as any;

const RankBadge = ({ xp }: { xp: number }) => {
  if (xp > 1000) return <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase shadow-lg shadow-purple-500/20 tracking-tighter">Legendary Explorer</div>;
  if (xp > 500) return <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase shadow-lg shadow-blue-500/20 tracking-tighter">World Traveler</div>;
  return <div className="bg-neutral-800 text-white/60 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter">Junior Nomad</div>;
};

export const PassportPage: React.FC = () => {
  const { wallet } = useUserStore();

  return (
    <div className="p-10 bg-gradient-to-br from-[#111] to-black rounded-[4rem] text-white shadow-2xl relative overflow-hidden border border-white/5 ring-4 ring-white/[0.02]">
      {/* Neural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full" />
      
      <div className="flex justify-between items-start mb-14 relative z-10">
        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-yellow-500 border border-white/10 shadow-2xl rotate-6">
          <Globe size={32} />
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">Travel ID</h2>
          <p className="text-yellow-500 text-[9px] font-black mt-1 uppercase tracking-[0.4em]">Rahnam Global Citizen</p>
        </div>
      </div>

      {/* Identity Data Deck */}
      <div className="grid grid-cols-2 gap-10 mb-14 relative z-10">
        <div className="space-y-6">
           <div className="space-y-1">
             <span className="text-[8px] font-black text-white/20 block uppercase tracking-widest">Available Fuel</span>
             <span className="text-lg font-black flex items-center gap-2 text-yellow-500">
               <Zap size={14} fill="currentColor" />
               {Math.floor(wallet.balance * 60)} MIN
             </span>
           </div>
           <div className="space-y-1">
             <span className="text-[8px] font-black text-white/20 block uppercase tracking-widest">Current Rank</span>
             <RankBadge xp={wallet.xp} />
           </div>
        </div>
        <div className="space-y-6 text-right">
           <div className="space-y-1">
             <span className="text-[8px] font-black text-white/20 block uppercase tracking-widest">Passport Status</span>
             <span className="text-xs font-black text-green-500 flex items-center justify-end gap-1.5">
               VALID <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             </span>
           </div>
           <div className="space-y-1">
             <span className="text-[8px] font-black text-white/20 block uppercase tracking-widest">Points Accumulation</span>
             <span className="text-lg font-black text-indigo-400">{wallet.xp} XP</span>
           </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between items-center relative z-10">
         <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Visa Archives</span>
         <div className="h-[1px] bg-white/5 flex-1 mx-6" />
      </div>

      {/* Modern Stamps Scroll */}
      <div className="grid grid-cols-2 gap-4 relative z-10 max-h-[320px] overflow-y-auto no-scrollbar pb-6">
        {wallet.stamps.length === 0 ? (
          <div className="col-span-2 py-16 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center gap-4 opacity-20">
             <Milestone size={40} />
             <p className="text-[10px] font-black uppercase tracking-widest">No Active Visas Yet</p>
          </div>
        ) : (
          wallet.stamps.map((stamp, idx) => (
            <motion.div
              key={stamp.placeId}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="h-32 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] flex flex-col items-center justify-center p-4 relative group hover:bg-white/[0.05] transition-colors"
            >
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-indigo-500/20" />
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 text-white/20 group-hover:text-yellow-500 transition-colors">
                <MapPin size={24} />
              </div>
              <span className="text-[9px] font-black text-center text-white/90 leading-tight truncate w-full px-2">{stamp.placeName}</span>
              <span className="text-[7px] text-white/20 font-bold mt-2 uppercase tracking-tighter">{stamp.date}</span>
            </motion.div>
          ))
        )}
        
        {wallet.stamps.length > 0 && (
          <div className="h-32 border-2 border-dashed border-white/[0.03] rounded-[2.5rem] flex items-center justify-center">
            <Star className="text-white/[0.02] animate-spin-slow" size={28} />
          </div>
        )}
      </div>
    </div>
  );
};
