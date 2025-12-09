import React from 'react';
import { StepProps } from '../types';
import { INDUSTRIES, TOTAL_STEPS } from '../constants';
import { ArrowLeft } from 'lucide-react';

const Step2Industry: React.FC<StepProps> = ({ state, updateState, onNext, onBack }) => {
  const progress = (2 / TOTAL_STEPS) * 100;

  const handleSelect = (id: string) => {
    updateState({ selectedIndustry: id });
    // Small delay to allow the visual selection feedback to be seen before transition
    setTimeout(() => {
        onNext();
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full animate-swoosh relative py-8">
      
      <div className="text-center mb-8 relative z-20 pointer-events-none flex flex-col items-center shrink-0">
        <h2 className="text-sm font-swiss font-bold tracking-widest text-impacto-blue mb-2 uppercase drop-shadow-md">Paso 02</h2>
        
        {/* Progress Bar */}
        <div className="w-12 md:w-16 h-[2px] bg-gray-800 mb-6 relative overflow-hidden rounded-full shadow-lg">
            <div className="absolute inset-0 bg-white" style={{ width: `${progress}%` }}></div>
        </div>

        <h1 className="text-3xl md:text-5xl font-swiss font-bold leading-tight text-white drop-shadow-xl">
            Selecciona tu <span className="italic font-charter font-normal border-b border-impacto-blue text-white">industria</span>
        </h1>
      </div>

      {/* Scrollable Container within the fixed-height slide */}
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide px-4">
        <div className="flex flex-wrap justify-center content-start gap-4 md:gap-6 pb-20 max-w-6xl mx-auto perspective-1000">
            {INDUSTRIES.map((industry) => {
                const isSelected = state.selectedIndustry === industry.id;
                
                return (
                    // Fixed wrapper ensures the grid never shifts, regardless of the bubble's scale transform
                    <div key={industry.id} className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center isolate">
                        <button
                            onClick={() => handleSelect(industry.id)}
                            className={`
                                absolute w-full h-full rounded-full transition-all duration-300 ease-out flex flex-col items-center justify-center group overflow-hidden
                                backdrop-blur-xl border-0
                                ${isSelected 
                                    ? 'z-20 bg-impacto-blue scale-110 shadow-[0_0_60px_rgba(35,52,138,0.8)]' 
                                    : 'z-0 bg-[#0a0a0a]/60 hover:z-10 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                                }
                            `}
                        >
                             <div className="relative z-10 flex flex-col items-center p-2 text-center w-full pointer-events-none">
                                <span className={`font-swiss font-bold text-center leading-tight transition-all duration-300 px-1 ${isSelected ? 'text-white text-xs md:text-sm' : 'text-gray-400 text-[10px] md:text-xs group-hover:text-white'}`}>
                                    {industry.label}
                                </span>
                             </div>
                        </button>
                    </div>
                );
            })}
        </div>
      </div>

      <div className="absolute bottom-4 flex gap-6 z-40">
         <button 
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-white hover:text-white transition-colors bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
};

export default Step2Industry;