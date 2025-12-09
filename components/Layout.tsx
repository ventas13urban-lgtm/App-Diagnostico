import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}

const Layout: React.FC<LayoutProps> = ({ children, step, totalSteps }) => {
  return (
    <div className="h-[100dvh] w-full font-mono flex flex-col relative overflow-hidden bg-[#050505] text-white selection:bg-impacto-blue selection:text-white transition-colors duration-700">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-grain mix-blend-overlay opacity-20 z-0"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-[#050505]/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
             {/* Typographic Logo - Roboto Mono Light */}
             <span className="font-mono font-light text-2xl md:text-3xl tracking-widest text-white select-none">
                IMPACTO
             </span>
        </div>
        
        {/* Progress bar removed from header as requested */}
      </header>

      {/* Main Content Area - Locked Height, No Scroll */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-hidden">
        {children}
      </main>

      {/* Footer/Copyright */}
      <footer className="fixed bottom-4 w-full text-center text-[9px] md:text-[10px] tracking-widest uppercase z-10 pointer-events-none text-gray-600">
        Diagnóstico Estratégico © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;