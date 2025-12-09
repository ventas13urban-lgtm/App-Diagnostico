import React, { useMemo } from 'react';
import { StepProps } from '../types';
import { MAX_AD_SPEND, TOTAL_STEPS } from '../constants';
import { formatMXN } from '../utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Step3Spend: React.FC<StepProps> = ({ state, updateState, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ adSpend: parseInt(e.target.value) });
  };

  const progress = (3 / TOTAL_STEPS) * 100;

  // Reaction Text Logic (No Emojis)
  const getReactionText = (spend: number) => {
    if (spend === 0) return "Sin inversión no hay paraíso";
    if (spend < 5000) return "Presupuesto de estudiambre";
    if (spend < 15000) return "¿Rompiendo el cochinito?";
    if (spend < 30000) return "Ya estamos hablando de negocios";
    if (spend < 45000) return "Modo tiburón activado";
    return "Wow ¿Eres tú? ¿Jeff Bezos?";
  };

  const reactionText = getReactionText(state.adSpend);

  // Generate deterministic coins based on spend
  // 1 coin per 1000 MXN
  const coinCount = Math.floor(state.adSpend / 1000);
  
  // Create static positions across the entire screen
  const coins = useMemo(() => {
    // Generate enough potential positions for max spend (50 coins)
    return Array.from({ length: 50 }).map((_, i) => {
        // Random positions 10-90% of container to keep within "binding box" of device
        const left = 10 + Math.random() * 80;
        const top = 10 + Math.random() * 80;
        // Random rotation for natural feel
        const rotation = Math.random() * 360;
        
        return { id: i, left, top, rotation };
    });
  }, []); // Stable positions

  // Slice the coins array based on current spend
  const activeCoins = coins.slice(0, coinCount);

  // Calculate percentage for positioning the meme text
  const sliderPercentage = (state.adSpend / MAX_AD_SPEND) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full animate-swoosh relative isolate">
      
      {/* BACKGROUND COINS LAYER - SOLID, DARK, NO BORDER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {activeCoins.map((coin) => (
            <div 
                key={coin.id}
                className="absolute flex items-center justify-center rounded-full bg-[#1e293b] shadow-[0_4px_10px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out animate-in zoom-in spin-in-12"
                style={{
                    left: `${coin.left}%`,
                    top: `${coin.top}%`,
                    width: 'clamp(80px, 12vw, 120px)', // Larger uniform size
                    height: 'clamp(80px, 12vw, 120px)',
                    transform: `translate(-50%, -50%) rotate(${coin.rotation}deg)`, // No scale variation
                    zIndex: 0,
                }}
            >
                <span className="font-swiss font-bold text-white/30 text-4xl md:text-6xl select-none">$</span>
            </div>
        ))}
      </div>

      {/* Local Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center mb-6 z-10 relative">
        <h2 className="text-xs md:text-sm font-swiss font-bold tracking-widest text-impacto-blue mb-2 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Paso 03</h2>
        <div className="w-12 md:w-16 h-[2px] bg-gray-800 relative overflow-hidden rounded-full shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 bg-white" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-swiss font-bold text-center mb-4 max-w-3xl leading-tight text-white px-2 z-10 relative drop-shadow-[0_4px_4px_rgba(0,0,0,1)] text-shadow-lg">
        Inversión mensual en <br/>
        <span className="italic font-charter font-normal text-gray-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">publicidad</span>
      </h1>

      {/* Glassmorphism Container - BORDER REMOVED */}
      <div 
        className="w-full max-w-2xl mt-4 md:mt-8 relative bg-[#0a0a0a]/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl transition-all duration-300 ease-out mx-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20"
      >
        
        <div className="flex flex-col items-center mb-8 md:mb-12 relative min-h-[100px] justify-center">
            {/* Main Number Display */}
            <div className="relative z-10 text-center mt-2 bg-[#050505]/80 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
                <span 
                    className="text-4xl md:text-7xl font-mono font-light text-white tracking-tighter"
                >
                    {formatMXN(state.adSpend)}
                </span>
                <p className="text-gray-400 font-charter italic mt-2 text-sm md:text-base">MXN / mes</p>
            </div>
        </div>

        {/* Custom Range Slider */}
        <div className="relative w-full h-16 flex items-center px-4 group mt-8">
             {/* Track */}
             <div className="absolute left-4 right-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-white relative transition-all duration-100 ease-linear"
                    style={{ width: `${sliderPercentage}%` }}
                 >
                    {/* Animated shine effect on the bar */}
                    <div className="absolute inset-0 bg-impacto-blue/30 w-full animate-pulse"></div>
                 </div>
             </div>

             {/* Thumbs/Steps visual markers (decorative) */}
             <div className="absolute left-4 right-4 flex justify-between pointer-events-none px-1">
                {[0, 10000, 20000, 30000, 40000, 50000].map(val => (
                    <div key={val} className={`w-1 h-1 rounded-full transition-colors duration-300 ${state.adSpend >= val ? 'bg-white' : 'bg-gray-700'}`}></div>
                ))}
             </div>

             <input
                type="range"
                min="0"
                max={MAX_AD_SPEND}
                step="1000"
                value={state.adSpend}
                onChange={handleChange}
                className="w-full absolute inset-0 opacity-0 cursor-pointer z-30"
            />
            
            {/* Custom Thumb handle follower + Meme Text Attached */}
            <div 
                className="absolute h-6 w-6 pointer-events-none transition-all duration-100 ease-linear z-20"
                style={{ 
                    left: `calc(${sliderPercentage}% + 16px)`,
                    transform: 'translateX(-100%)'
                }}
            >
                {/* Thumb */}
                <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center">
                     <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>

                {/* Meme Text Attached Above Thumb */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[250px] text-center pointer-events-none">
                     <span className="text-xs md:text-sm font-mono font-bold text-white uppercase tracking-tight bg-black/80 px-3 py-1 rounded-md border border-white/20 whitespace-normal">
                        "{reactionText}"
                     </span>
                     {/* Connecting Line */}
                     <div className="w-[1px] h-4 bg-white/20 absolute left-1/2 -translate-x-1/2 top-full"></div>
                </div>
            </div>
        </div>
        
        <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-2 px-4">
            <span>$0</span>
            <span>$25k</span>
            <span>$50k+</span>
        </div>

      </div>

      <div className="mt-12 md:mt-16 flex gap-4 md:gap-6 z-20">
         <button 
            onClick={onBack}
            className="w-12 h-12 md:w-auto md:h-auto md:p-4 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-white hover:text-white transition-colors bg-white/5 backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onNext}
            className="group flex items-center gap-4 px-8 md:px-10 py-4 bg-white text-black rounded-full hover:bg-impacto-blue hover:text-white transition-colors duration-300 shadow-lg hover:shadow-impacto-blue/30"
          >
            <span className="font-mono text-xs md:text-sm tracking-wide">CONTINUAR</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default Step3Spend;