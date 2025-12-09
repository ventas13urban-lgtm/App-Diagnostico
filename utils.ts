export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value).replace('$', '$'); // Keeping standard $
};

export const formatMXN = (value: number): string => {
   return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
}

// Mock calculation for the percentile ranking
export const calculatePercentile = (
  size: number,
  spend: number,
  digital: number
): { percentile: number; tier: string; message: string; score: number } => {
  // Simple weighted score for prototype
  const spendScore = (spend / 50000) * 50; // Max 50 points
  const digitalScore = (digital / 100) * 30; // Max 30 points
  const sizeScore = Math.min(size, 150) / 150 * 20; // Max 20 points
  
  const totalScore = spendScore + digitalScore + sizeScore;
  
  if (totalScore > 85) {
    return { 
      percentile: 5, 
      score: 95,
      tier: "Líder de Categoría", 
      message: "Tus métricas son impresionantes y lideras el mercado. El reto ahora no es crecer, sino blindar tu posición. Una estrategia de alto nivel es lo único que separa al líder de la leyenda." 
    };
  } else if (totalScore > 60) {
    return { 
      percentile: 20, 
      score: 80,
      tier: "Alto Rendimiento", 
      message: "Estás superando al promedio con fuerza. Tienes el motor financiero, pero para entrar al Top 5% necesitas afinar la puntería. Invertir más sin estrategia solo quemará presupuesto." 
    };
  } else if (totalScore > 30) {
    return { 
      percentile: 50, 
      score: 50,
      tier: "En Crecimiento", 
      message: "Tienes tracción y validación de mercado. Es un gran comienzo, pero estás en la 'zona de ruido'. Para destacar, necesitas amplificar tu inversión digital con precisión quirúrgica." 
    };
  } else {
    return { 
      percentile: 80, 
      score: 20,
      tier: "Etapa Inicial", 
      message: "El potencial está ahí. Tienes la base, pero tu huella digital es tímida. Es el momento perfecto para construir una estructura escalable antes de acelerar la inversión." 
    };
  }
};