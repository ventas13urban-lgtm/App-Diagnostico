import React from 'react';
import { StepProps } from '../types';
import { MAX_COMPANY_SIZE, TOTAL_STEPS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Step1Size: React.FC<StepProps> = ({ state, updateState, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ companySize: parseInt(e.target.value) });
  };

  const isMax = state.companySize >= MAX_COMPANY_SIZE;
  
  // Calculate scale for the blue circle. 
  // It starts small and grows to cover the screen partially.
  const scale = 0.5 + (state.companySize / MAX_COMPANY_SIZE) * 20; 

  const progress = (1 / TOTAL_STEPS) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full animate-swoosh relative">
      
      {/* Expanding Blue Circle Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div 
            className="w-16 h-16 bg-impacto-blue rounded-full transition-transform duration-200 ease-out"
            style={{ transform: `scale(${scale})` }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-xs md:text-sm font-swiss font-bold tracking-widest text-impacto-blue mb-2 uppercase">Paso 01</h2>
        
        {/* Progress Bar */}
        <div className="w-12 md:w-16 h-[2px] bg-gray-800 mb-6 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-white" style={{ width: `${progress}%` }}></div>
        </div>

        <h1 className="text-3xl md:text-6xl font-swiss font-bold text-center mb-8 max-w-3xl leading-tight text-white">
          ¿Cuál es la escala de <br/>
          <span className="italic font-charter font-normal">tu organización?</span>
        </h1>

        <div className="w-full max-w-xs md:max-w-lg mt-8 md:mt-12 relative">
            {/* Number Display */}
            <div className="text-center mb-10 md:mb-12 text-white">
                <span className="text-7xl md:text-9xl font-swiss font-bold transition-all duration-100 ease-linear inline-block min-w-[150px] md:min-w-[200px]">
                    {isMax ? '150+' : state.companySize}
                </span>
                <p className="font-charter italic mt-2 text-base md:text-lg opacity-80">empleados</p>
            </div>

            {/* Custom Range Slider */}
            <div className="relative w-full h-12 flex items-center group">
                <input
                    type="range"
                    min="1"
                    max={MAX_COMPANY_SIZE}
                    value={state.companySize}
                    onChange={handleChange}
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 accent-white z-20 relative"
                />
            </div>
            
            <div className="flex justify-between text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-wider mt-2">
                <span>Solo Founder</span>
                <span>Enterprise</span>
            </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 relative z-20">
          <button 
            onClick={onNext}
            className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full hover:bg-impacto-blue hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(35,52,138,0.4)]"
          >
            <span className="font-mono text-xs md:text-sm tracking-wide">CONFIRMAR TAMAÑO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default Step1Size;