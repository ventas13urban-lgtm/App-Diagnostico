import React, { useEffect, useState } from 'react';
import { StepProps } from '../types';
import { calculatePercentile } from '../utils';
import { Calendar, RefreshCcw } from 'lucide-react';

const Step5Results: React.FC<StepProps> = ({ state, onNext }) => {
  const [showContent, setShowContent] = useState(false);
  
  // Simulate calculation delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const result = calculatePercentile(state.companySize, state.adSpend, state.digitalPercent);

  if (!showContent) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-white">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-impacto-blue rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(35,52,138,0.3)]"></div>
            <h2 className="font-swiss font-bold text-lg md:text-xl animate-pulse text-gray-300">Analizando Datos de la Industria...</h2>
        </div>
    )
  }

  // Calculate visual position for the bar (0 to 100%)
  const barPosition = result.score;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full animate-swoosh text-white">
      
      {/* Top Badge */}
      <div className="bg-impacto-blue/20 text-impacto-blue border border-impacto-blue/50 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-sm">
        Diagnóstico Completo
      </div>

      {/* Main Ranking */}
      <div className="relative mb-8 text-center">
        <h1 className="text-xl md:text-2xl font-charter italic text-gray-400 mb-2">
            Te posicionas en el
        </h1>
        <div className="relative inline-block">
             <span className="text-7xl md:text-9xl font-swiss font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] leading-none">
                Top {result.percentile}%
            </span>
        </div>
      </div>

      {/* Visual Rank Meter */}
      <div className="w-full max-w-xl mb-10 px-8">
          <div className="flex justify-between text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
              <span>Promedio</span>
              <span>Competitivo</span>
              <span>Líder</span>
          </div>
          <div className="h-3 w-full bg-gray-800 rounded-full relative overflow-visible">
              {/* Gradient Background for bar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 via-impacto-blue to-white opacity-20"></div>
              
              {/* Marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-white shadow-[0_0_15px_white] transition-all duration-1000 ease-out"
                style={{ left: `${barPosition}%` }}
              >
                 {/* Label BELOW the bar */}
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] md:text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
                    TU LUGAR
                 </div>
              </div>
          </div>
      </div>

      {/* Result Tier */}
       <h3 className="text-lg md:text-xl font-mono font-bold text-white uppercase tracking-widest py-2 px-6 border-y border-white/20 inline-block bg-white/5 backdrop-blur-sm mb-12 text-center">
            {result.tier}
        </h3>

      {/* CTA Section - Immediate Visibility */}
      <div className="w-full max-w-lg bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-6 backdrop-blur-xl mx-4 mb-4">
        <div className="text-center">
            <h4 className="font-swiss font-bold text-base md:text-lg mb-1 text-white">Escala tu posicionamiento</h4>
            <p className="font-charter italic text-xs text-gray-400">
                Agenda una sesión estratégica para convertir estos datos en una hoja de ruta.
            </p>
        </div>
        <button 
            onClick={onNext}
            className="w-full bg-white text-black px-6 py-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:bg-impacto-blue hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
            <Calendar className="w-4 h-4" />
            Reservar Asesoría
        </button>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="mt-4 flex items-center gap-2 text-xs font-mono text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
      >
        <RefreshCcw className="w-3 h-3" />
        Reiniciar
      </button>

    </div>
  );
};

export default Step5Results;