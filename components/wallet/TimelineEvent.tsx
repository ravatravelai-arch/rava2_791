import React from 'react';
import { motion as _motion } from 'framer-motion';
import { Plane, Hotel, Utensils, MapPin, Ticket, Clock, ArrowLeft } from 'lucide-react';
import { TripEvent } from '../../types';
import { useMapStore } from '../../store/useMapStore';
import { useUIStore } from '../../store/useUIStore';
import { GeoPoint } from '../../utils/geoPoint';

const motion = _motion as any;

interface TimelineEventProps {
  event: TripEvent;
  isLast: boolean;
  index: number;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'flight': return Plane;
    case 'hotel': return Hotel;
    case 'food': return Utensils;
    default: return MapPin;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'flight': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'hotel': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'food': return 'text-green-400 bg-green-400/10 border-green-400/20';
    default: return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
  }
};

export const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isLast, index }) => {
  const { setActivePOI } = useMapStore();
  const { setActiveTab } = useUIStore();
  
  const Icon = getIcon(event.type);
  const colorClass = getColor(event.type);
  const isNow = event.status === 'now';

  const handleShowOnMap = () => {
    // استفاده از GeoPoint برای تضمین صحت مختصات قبل از ارسال به نقشه
    const geo = GeoPoint.fromArray(event.coordinates);
    if (geo) {
      setActivePOI({
        id: event.id,
        name: event.title,
        lat: geo.lat,
        lng: geo.lng,
        category: event.type,
        description: event.details.address
      } as any);
      setActiveTab('home');
    }
  };

  return (
    <div className="relative pl-6">
      {/* Connector Line */}
      {!isLast && (
        <div className={`absolute top-8 right-[7px] w-0.5 bottom-[-24px] ${isNow ? 'bg-gradient-to-b from-yellow-500 to-white/10' : 'bg-white/10'}`} />
      )}
      
      {/* Node Dot */}
      <div className={`absolute right-0 top-1 w-4 h-4 rounded-full border-2 z-10 ${
        isNow 
          ? 'bg-yellow-500 border-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-pulse' 
          : 'bg-black border-white/20'
      }`} />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative glass rounded-[1.8rem] p-5 border ${isNow ? 'border-yellow-500/30' : 'border-white/5'} overflow-hidden group`}
      >
        {isNow && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 blur-xl rounded-full pointer-events-none" />}
        
        <div className="flex justify-between items-start mb-3">
            <span className={`text-[10px] font-black tracking-widest bg-black/40 px-2 py-1 rounded-lg ${isNow ? 'text-yellow-500' : 'text-white/30'}`}>
              {event.time}
            </span>
            <div className={`p-2 rounded-xl ${colorClass}`}>
               <Icon size={18} />
            </div>
        </div>

        <h4 className={`text-lg font-black mb-1 ${isNow ? 'text-white' : 'text-white/80'}`}>{event.title}</h4>
        
        {event.details.address && (
          <p className="text-white/40 text-[10px] leading-relaxed mb-3 truncate">{event.details.address}</p>
        )}

        {/* Dynamic Details Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {event.details.flightNo && (
            <div className="bg-white/5 rounded-xl p-2 text-center">
              <span className="block text-white/20 text-[8px] uppercase">Flight</span>
              <span className="block text-white font-mono text-xs tracking-wider">{event.details.flightNo}</span>
            </div>
          )}
          {event.details.gate && (
            <div className="bg-white/5 rounded-xl p-2 text-center">
              <span className="block text-white/20 text-[8px] uppercase">Gate</span>
              <span className="block text-white font-black text-xs">{event.details.gate}</span>
            </div>
          )}
          {event.details.seat && (
            <div className="bg-white/5 rounded-xl p-2 text-center">
              <span className="block text-white/20 text-[8px] uppercase">Seat</span>
              <span className="block text-yellow-500 font-black text-xs">{event.details.seat}</span>
            </div>
          )}
        </div>

        {(event.status === 'upcoming' || event.coordinates) && (
           <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
              <button 
                onClick={handleShowOnMap}
                className="text-[10px] font-bold text-white/60 flex items-center gap-1 group-hover:text-yellow-500 transition-colors"
              >
                مشاهده روی نقشه <ArrowLeft size={12} />
              </button>
           </div>
        )}
      </motion.div>
    </div>
  );
};