import React, { useRef, useEffect, useState } from 'react';
import { StepProps } from '../types';
import { formatMXN } from '../utils';
import { TOTAL_STEPS } from '../constants';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Step4Digital: React.FC<StepProps> = ({ state, updateState, onNext, onBack }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Dimensions for calculation logic
  const radius = 120;
  const strokeWidth = 24;
  const padding = 60; // Extra space to prevent glow clipping
  const center = radius + strokeWidth + padding;
  const size = center * 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate SVG stroke offset based on percentage
  const strokeDashoffset = circumference - (state.digitalPercent / 100) * circumference;

  const calculateAngle = (clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    
    // Atan2 returns angle in radians from -PI to PI
    // We rotate -90deg (PI/2) to start from top
    let angle = Math.atan2(y, x);
    
    // Convert to degrees and shift so top is 0
    let degrees = angle * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    
    const percent = Math.min(100, Math.max(0, Math.round((degrees / 360) * 100)));
    updateState({ digitalPercent: percent });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateAngle(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      calculateAngle(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      // Touch support
      window.addEventListener('touchmove', (e) => handleMouseMove(e.touches[0] as unknown as MouseEvent));
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', (e) => handleMouseMove(e.touches[0] as unknown as MouseEvent));
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    calculateAngle(e.touches[0].clientX, e.touches[0].clientY);
  }


  const calculatedDigitalSpend = (state.adSpend * state.digitalPercent) / 100;
  const progress = (4 / TOTAL_STEPS) * 100;

  return (
    <>
    {/* Dynamic Background Layer */}
    <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-75 ease-linear"
        style={{
            background: `linear-gradient(90deg, #23348a ${state.digitalPercent}%, #050505 ${state.digitalPercent}%)`
        }}
    >
        {/* Texture overlay on top of color */}
        <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-20"></div>
    </div>

    {/* Main Container */}
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-140px)] md:min-h-[80vh] animate-swoosh relative z-10 px-4 py-4 md:py-10">
      
      {/* Header Section - Outside Glass */}
      <div className="flex flex-col items-center mb-6 md:mb-8">
        <h2 className="text-xs md:text-sm font-swiss font-bold tracking-widest text-white/70 mb-2 uppercase mix-blend-difference drop-shadow-md">Paso 04</h2>
        
        {/* Progress Bar */}
        <div className="w-12 md:w-16 h-[2px] bg-white/20 mb-4 md:mb-6 relative overflow-hidden rounded-full shadow-lg">
                <div className="absolute inset-0 bg-white" style={{ width: `${progress}%` }}></div>
        </div>

        <h1 className="text-2xl md:text-5xl font-swiss font-bold text-center max-w-3xl leading-tight text-white drop-shadow-xl text-shadow-lg">
            Porcentaje asignado a <br/>
            <span className="italic font-charter font-normal text-white/80">canales digitales</span>
        </h1>
      </div>

      {/* Blurry Glass Container for Interactive Elements - BORDER REMOVED, MATCH STEP 3 */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 w-full max-w-lg flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        {/* Interactive Graph Section */}
        <div className="relative select-none group w-full flex justify-center items-center mb-8">
            {/* Responsive SVG Wrapper */}
            <div className="w-[60vw] max-w-[260px] md:max-w-[320px] aspect-square relative">
                <svg 
                    ref={svgRef}
                    viewBox={`0 0 ${size} ${size}`}
                    className="w-full h-full cursor-pointer transform -rotate-0 drop-shadow-2xl"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{ overflow: 'visible' }}
                >
                    {/* Background Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="rgba(255,255,255,0.1)" // Faint white
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle - White */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#ffffff" // White
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-100 ease-out drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        transform={`rotate(-90 ${center} ${center})`}
                    />
                    
                    {/* Drag Interaction Layer (Invisible) */}
                    <g transform={`rotate(${(state.digitalPercent * 3.6) - 90} ${center} ${center})`}>
                        <circle
                            cx={center + radius}
                            cy={center}
                            r={50}
                            fill="transparent"
                            className="cursor-grab active:cursor-grabbing"
                        />
                    </g>
                </svg>

                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                    <span className="text-4xl md:text-5xl font-swiss font-bold text-white drop-shadow-lg leading-none">
                        {state.digitalPercent}%
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-gray-300 tracking-widest uppercase mt-2 leading-tight">
                        para publicidad digital
                    </span>
                </div>
            </div>
        </div>

        {/* Footer Section: Stats & Navigation */}
        <div className="w-full flex flex-col items-center gap-6">
            {/* Real-time Calculation */}
            <div className="flex flex-col items-center w-full">
                <p className="font-charter italic text-gray-300 mb-1 text-xs md:text-sm text-center">Inversión digital estimada</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl md:text-3xl font-mono text-white font-bold drop-shadow-md">
                        {formatMXN(calculatedDigitalSpend)}
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-gray-400">MXN</span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 my-2"></div>

            <div className="flex gap-4 md:gap-6">
                <button 
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-gray-300 hover:border-white hover:text-white transition-colors bg-white/5 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={onNext}
                    className="group flex items-center gap-4 px-8 md:px-10 py-4 bg-white text-black rounded-full hover:bg-impacto-blue hover:text-white transition-colors duration-300 shadow-xl"
                >
                    <span className="font-mono text-xs md:text-sm tracking-wide">VER RESULTADOS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Step4Digital;