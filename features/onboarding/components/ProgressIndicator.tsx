
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => (
  <div className="flex justify-between items-center mb-12 flex-row-reverse gap-4">
    {[1, 2, 3].map(i => (
      <React.Fragment key={i}>
        <div className="flex-1 flex items-center gap-3 flex-row-reverse">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border-2 transition-all duration-700 ${
            currentStep >= i 
              ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] rotate-0' 
              : 'border-white/10 text-white/20 rotate-12'
          }`}>
            {i}
          </div>
          {i < 3 && (
            <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/5 relative">
              <div 
                className={`absolute inset-0 bg-yellow-500 transition-transform duration-1000 origin-right ${
                  currentStep > i ? 'scale-x-100' : 'scale-x-0'
                }`} 
              />
            </div>
          )}
        </div>
      </React.Fragment>
    ))}
  </div>
);
