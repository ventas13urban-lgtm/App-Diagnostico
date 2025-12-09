import { Industry } from './types';

export const TOTAL_STEPS = 6;

export const INDUSTRIES: Industry[] = [
  { 
    id: 'tech', 
    label: 'SaaS y Tecnología', 
    description: 'Software escalable e infraestructura digital.',
    subIndustries: ['B2B SaaS', 'Cybersecurity', 'AI & Machine Learning', 'Cloud Infrastructure', 'Consumer Apps']
  },
  { 
    id: 'fashion', 
    label: 'Moda y Retail', 
    description: 'Marcas direct-to-consumer con alto valor estético.',
    subIndustries: ['Apparel', 'Luxury Goods', 'Footwear', 'Accessories', 'Sustainable Fashion']
  },
  { 
    id: 'consulting', 
    label: 'Consultoría', 
    description: 'Servicios profesionales y asesoría estratégica.',
    subIndustries: ['Management Consulting', 'HR & Recruiting', 'Financial Advisory', 'IT Consulting', 'Strategy Firms']
  },
  { 
    id: 'health', 
    label: 'Salud y Bienestar', 
    description: 'Clínicas, suplementos y optimización de estilo de vida.',
    subIndustries: ['Medical Clinics', 'Supplements', 'Mental Health', 'Fitness Tech', 'Biotech']
  },
  { 
    id: 'realestate', 
    label: 'Bienes Raíces', 
    description: 'Desarrollo, ventas y administración de propiedades.',
    subIndustries: ['Residential Dev', 'Commercial Real Estate', 'PropTech', 'Property Management', 'Architecture']
  },
  { 
    id: 'hospitality', 
    label: 'Hospitalidad', 
    description: 'Hoteles, restaurantes y experiencias premium.',
    subIndustries: ['Boutique Hotels', 'Fine Dining', 'Travel Agencies', 'Event Venues', 'Luxury Concierge']
  },
  { 
    id: 'education', 
    label: 'Educación', 
    description: 'Plataformas de e-learning e instituciones de formación.',
    subIndustries: ['EdTech', 'Universities', 'Corporate Training', 'Language Schools', 'Online Courses']
  },
  { 
    id: 'finance', 
    label: 'Fintech y Banca', 
    description: 'Soluciones financieras modernas y firmas de inversión.',
    subIndustries: ['Neobanks', 'Crypto/Web3', 'Insurance', 'Payment Gateways', 'Wealth Management']
  },
  { 
    id: 'art', 
    label: 'Arte y Diseño', 
    description: 'Galerías, estudios creativos y agencias de diseño.',
    subIndustries: ['Graphic Design', 'Interior Design', 'Art Galleries', 'Photography', 'Motion Graphics']
  },
  { 
    id: 'logistics', 
    label: 'Logística', 
    description: 'Gestión de cadena de suministro y transporte.',
    subIndustries: ['Last-Mile Delivery', 'Freight Forwarding', 'Warehousing', 'Supply Chain Tech', 'Fleet Management']
  },
  { 
    id: 'energy', 
    label: 'Energía', 
    description: 'Recursos renovables y tecnología sostenible.',
    subIndustries: ['Solar', 'Wind', 'Green Tech', 'Oil & Gas Services', 'Utilities']
  },
  { 
    id: 'legal', 
    label: 'Servicios Legales', 
    description: 'Derecho corporativo y prácticas especializadas.',
    subIndustries: ['Corporate Law', 'IP Law', 'Litigation', 'Family Law', 'Legal Tech']
  },
  { 
    id: 'entertainment', 
    label: 'Entretenimiento', 
    description: 'Producción de medios y gestión de talento.',
    subIndustries: ['Film Production', 'Music Industry', 'Gaming', 'Influencer Management', 'Streaming Media']
  },
  { 
    id: 'manufacturing', 
    label: 'Manufactura', 
    description: 'Producción industrial y fabricación.',
    subIndustries: ['Automotive', 'Electronics', 'Textiles', 'Food & Bev Production', 'Industrial Equipment']
  },
  { 
    id: 'marketing', 
    label: 'Agencia de Marketing', 
    description: 'Crecimiento digital y servicios de branding.',
    subIndustries: ['Performance Marketing', 'SEO/SEM', 'Social Media', 'PR Agencies', 'Content Production']
  },
];

export const MAX_COMPANY_SIZE = 150;
export const MAX_AD_SPEND = 50000;