
import React from 'react';
import { Camera } from 'lucide-react';
import { useMissionStore } from '../../store/useMissionStore';
import { useUIStore } from '../../store/useUIStore';

interface POIMissionActionProps {
  poiId: string;
  poiName: string;
  onInitiated: () => void;
}

export const POIMissionAction: React.FC<POIMissionActionProps> = ({ poiId, poiName, onInitiated }) => {
  const { startMission, activeMissions } = useMissionStore();
  const { setShowVision } = useUIStore();

  const isMissionActive = activeMissions.some(m => m.poiId === poiId);

  const handleStart = () => {
    if (isMissionActive) return;
    startMission(poiId, poiName, 100, 250);
    setShowVision(true);
    onInitiated();
  };

  return (
    <button 
      onClick={handleStart}
      disabled={isMissionActive}
      className="flex-1 glass border-yellow-500/20 p-5 rounded-[2.5rem] flex flex-col items-center gap-2 group active:scale-95 transition-all disabled:opacity-50"
    >
      <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-lg group-hover:rotate-12 transition-transform">
        <Camera size={24} />
      </div>
      <span className="text-white font-black text-xs">مأموریت عکاسی</span>
      <span className="text-yellow-500 text-[9px] font-bold uppercase">
        {isMissionActive ? 'در حال اجرا' : '+۱۰۰ سکه'}
      </span>
    </button>
  );
};
