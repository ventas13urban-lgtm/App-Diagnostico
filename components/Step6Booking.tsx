import React, { useState } from 'react';
import { StepProps } from '../types';
import { ArrowLeft, CheckCircle2, Calendar, Clock, ArrowRight, CalendarPlus, Linkedin, Instagram } from 'lucide-react';

const Step6Booking: React.FC<StepProps> = ({ state, updateState, onBack }) => {
  const [confirmed, setConfirmed] = useState(false);

  // Generate 10 dates
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip weekends if desired, but for now showing all
      dates.push(d);
    }
    return dates;
  };

  const dates = generateDates();
  // 8 Time slots
  const times = [
      "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", 
      "03:00 PM", "04:30 PM", "05:30 PM", "07:00 PM"
  ];

  const handleConfirm = () => {
    if (state.bookingDate && state.bookingTime) {
        setConfirmed(true);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
  };

  // Generate .ics file content
  const createCalendarEvent = () => {
    if (!state.bookingDate || !state.bookingTime) return '#';

    const date = new Date(state.bookingDate);
    // Parse time
    const [timePart, modifier] = state.bookingTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    date.setHours(hours, minutes);
    
    const startTime = date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    // Add 35 minutes duration
    date.setMinutes(date.getMinutes() + 35);
    const endTime = date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const event = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "SUMMARY:Estrategia Digital IMPACTO",
        "DESCRIPTION:Sesión de diagnóstico y estrategia digital 1:1.",
        "LOCATION:Google Meet",
        `DTSTART:${startTime}`,
        `DTEND:${endTime}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
    return URL.createObjectURL(blob);
  };

  if (confirmed) {
    const calendarUrl = createCalendarEvent();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full animate-in fade-in zoom-in duration-700 text-center px-4">
             <div className="w-20 h-20 bg-impacto-blue/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(35,52,138,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-impacto-blue" />
             </div>
             <h1 className="text-3xl md:text-5xl font-swiss font-bold text-white mb-4">
                Sesión Confirmada
             </h1>
             <p className="text-gray-400 font-charter italic text-lg mb-8 max-w-md">
                Hemos enviado los detalles a tu correo. Prepárate para transformar tu estrategia digital.
             </p>
             
             {/* Success Card */}
             <div className="bg-white/10 p-8 rounded-xl flex flex-col items-center gap-4 backdrop-blur-md mb-12 min-w-[280px] shadow-2xl">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-mono uppercase text-white/60 tracking-widest mb-1">Tu Cita</span>
                    <span className="text-2xl font-bold text-white capitalize font-swiss">{state.bookingDate && formatDate(state.bookingDate)}</span>
                    <span className="text-white font-mono text-lg">{state.bookingTime}</span>
                </div>

                <div className="w-full h-[1px] bg-white/20 my-2"></div>

                <a 
                    href={calendarUrl}
                    download="cita-impacto.ics"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wide transition-colors shadow-lg border-0"
                >
                    <CalendarPlus className="w-4 h-4" />
                    Agregar al Calendario
                </a>
             </div>

             <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Síguenos en redes</span>
                <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <Linkedin className="w-5 h-5" />
                        <span className="text-xs font-mono">LinkedIn</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <Instagram className="w-5 h-5" />
                        <span className="text-xs font-mono">Instagram</span>
                    </a>
                </div>
             </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full animate-swoosh max-w-5xl mx-auto py-4">
      
      {/* Header */}
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-xs md:text-sm font-swiss font-bold tracking-widest text-impacto-blue mb-2 uppercase">Paso Final</h2>
        <h1 className="text-2xl md:text-4xl font-swiss font-bold text-white mb-2">
           Reserva tu <span className="italic font-charter font-normal text-gray-400 border-b border-gray-700">Asesoría</span>
        </h1>
        <p className="text-gray-500 font-mono text-[10px] md:text-xs tracking-wide">
            35 MINUTOS • ESTRATEGIA DIGITAL • 1:1
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full px-4 mb-6 flex-1 min-h-0">
        
        {/* Date Selection - Scrollable */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 flex flex-col shadow-2xl h-full min-h-0">
            <div className="flex items-center gap-3 mb-4 text-white/90 shrink-0">
                <Calendar className="w-5 h-5 text-impacto-blue" />
                <span className="font-swiss font-bold text-sm uppercase tracking-wide">Selecciona fecha</span>
            </div>
            {/* Scrollable Container */}
            <div className="overflow-y-auto pr-2 flex-1 scrollbar-hide space-y-3">
                {dates.map((date) => {
                    const dateStr = date.toISOString();
                    const isSelected = state.bookingDate && new Date(state.bookingDate).toDateString() === date.toDateString();
                    return (
                        <button
                            key={dateStr}
                            onClick={() => updateState({ bookingDate: dateStr, bookingTime: null })}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between
                                ${isSelected 
                                    ? 'bg-impacto-blue text-white shadow-lg' 
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }
                            `}
                        >
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">
                                    {new Intl.DateTimeFormat('es-MX', { weekday: 'long' }).format(date)}
                                </span>
                                <span className="text-lg font-bold font-swiss">
                                    {new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' }).format(date)}
                                </span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* Time Selection - Scrollable */}
        <div className={`bg-white/10 backdrop-blur-2xl rounded-3xl p-6 flex flex-col shadow-2xl h-full min-h-0 transition-opacity duration-500 ${!state.bookingDate ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
             <div className="flex items-center gap-3 mb-4 text-white/90 shrink-0">
                <Clock className="w-5 h-5 text-impacto-blue" />
                <span className="font-swiss font-bold text-sm uppercase tracking-wide">Selecciona horario</span>
            </div>
            {/* Scrollable Grid */}
            <div className="overflow-y-auto pr-2 flex-1 scrollbar-hide">
                 <div className="grid grid-cols-2 gap-3">
                    {times.map((time) => {
                        const isSelected = state.bookingTime === time;
                        return (
                            <button
                                key={time}
                                onClick={() => updateState({ bookingTime: time })}
                                className={`p-4 rounded-xl text-center transition-all duration-300 font-mono text-sm
                                    ${isSelected 
                                        ? 'bg-white/20 text-white shadow-lg font-bold border border-white/40' 
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }
                                `}
                            >
                                {time}
                            </button>
                        )
                    })}
                </div>
            </div>
             {!state.bookingDate && (
                <div className="mt-4 pt-4 text-center text-xs text-gray-500 font-mono border-t border-white/10">
                    * Primero selecciona una fecha
                </div>
            )}
        </div>

      </div>

      {/* Actions */}
      <div className="flex gap-4 md:gap-6 z-20 shrink-0 mb-2">
         <button 
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleConfirm}
            disabled={!state.bookingDate || !state.bookingTime}
            className={`group flex items-center gap-4 px-8 md:px-12 py-4 rounded-full transition-all duration-300 shadow-xl
                ${state.bookingDate && state.bookingTime 
                    ? 'bg-impacto-blue text-white hover:bg-white hover:text-impacto-black shadow-[0_0_40px_rgba(35,52,138,0.6)] cursor-pointer' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                }
            `}
          >
            <span className="font-mono text-xs md:text-sm tracking-wide font-bold">CONFIRMAR RESERVA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

    </div>
  );
};

export default Step6Booking;