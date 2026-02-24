
import { create } from 'zustand';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  xp: number;
  poiId: string;
  isCompleted: boolean;
}

interface MissionState {
  activeMissions: Mission[];
  completedMissions: string[];
  startMission: (poiId: string, title: string, reward: number, xp: number) => void;
  completeMission: (missionId: string) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  activeMissions: [],
  completedMissions: [],
  
  startMission: (poiId, title, reward, xp) => set((state) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMission: Mission = {
      id,
      title,
      description: `یه عکس باحال از ${title} بگیر و جایزه‌ت رو بگیر!`,
      reward,
      xp,
      poiId,
      isCompleted: false
    };
    return { activeMissions: [...state.activeMissions, newMission] };
  }),

  completeMission: (missionId) => set((state) => ({
    activeMissions: state.activeMissions.filter(m => m.id !== missionId),
    completedMissions: [...state.completedMissions, missionId]
  })),
}));
