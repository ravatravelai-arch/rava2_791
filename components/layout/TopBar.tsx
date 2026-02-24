
import React from 'react';
import { useUserStore } from '../../store/useUserStore';
import { Settings, User, Globe } from 'lucide-react';
import { OfflineIndicator } from './OfflineIndicator';

export const TopBar: React.FC = () => {
  const { setCityMode } = useUserStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 glass px-4 py-2 rounded-full">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black text-xs">ر</div>
          <span className="text-white font-bold text-sm">رهنما</span>
        </div>
        <OfflineIndicator />
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setCityMode(null)}
          className="glass p-3 rounded-full text-white/80 hover:text-white transition-colors"
        >
          <Globe size={20} />
        </button>
        <button className="glass p-3 rounded-full text-white/80">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};
