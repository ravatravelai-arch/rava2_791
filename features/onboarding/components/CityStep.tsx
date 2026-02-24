
import React from 'react';
import { motion as _motion } from 'framer-motion';
import { CheckCircle2, MapPin } from 'lucide-react';
import { GlassCard } from '../../../components/core/GlassCard';
import { CityMode } from '../../../types';

const motion = _motion as any;

const CITIES = [
  { id: 'Istanbul', name: 'استانبول', desc: 'شهر رنگ‌ها و طعم‌های شرقی', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&q=75&w=800' },
  { id: 'Dubai', name: 'دبی', desc: 'تجربه دنیای مدرن و لوکس', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&q=75&w=800' }
];

interface CityStepProps {
  selectedCity: CityMode;
  onSelect: (city: string) => void;
}

export const CityStep: React.FC<CityStepProps> = ({ selectedCity, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 20 }} 
    className="space-y-10"
  >
    <div className="text-right space-y-2">
      <h1 className="text-4xl font-black text-white leading-tight">کجا قراره خاطره بسازیم؟</h1>
      <p className="text-white/40 text-sm font-bold">مقصد سفرت رو انتخاب کن رفیق.</p>
    </div>
    
    <div className="grid grid-cols-1 gap-5 pb-4">
      {CITIES.map(city => (
        <button 
          key={city.id} 
          onClick={() => onSelect(city.id)}
          className="relative w-full text-left outline-none group"
        >
          <GlassCard className={`relative overflow-hidden h-52 p-0 border-white/5 transition-all duration-500 ${selectedCity === city.id ? 'ring-2 ring-yellow-500 scale-[1.02]' : 'opacity-70 grayscale-[0.3]'}`}>
            <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" alt={city.name} />
            <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/40 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-right space-y-1">
              <div className="flex items-center justify-end gap-2 text-yellow-500">
                <h3 className="text-3xl font-black text-white">{city.name}</h3>
                <MapPin size={20} />
              </div>
              <p className="text-white/60 font-bold text-xs">{city.desc}</p>
            </div>

            {selectedCity === city.id && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-6 left-6 text-yellow-500"
              >
                <CheckCircle2 size={32} />
              </motion.div>
            )}
          </GlassCard>
        </button>
      ))}
    </div>
  </motion.div>
);
