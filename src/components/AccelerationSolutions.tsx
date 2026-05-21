import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';

interface Message {
  id: number;
  sender: 'client' | 'bot';
  text: string;
  time: string;
}

type Currency = 'COP' | 'USD' | 'EUR';

const CONVERSION_FACTORS: Record<Currency, number> = {
  COP: 0.00025, // 1 COP = 0.00025 USD
  USD: 1.0,     // Base
  EUR: 1.08,    // 1 EUR = 1.08 USD
};

interface SliderConfig {
  min: number;
  max: number;
  step: number;
  defaultVal: number;
}

const TICKET_SLIDER_CONFIGS: Record<Currency, SliderConfig> = {
  COP: {
    min: 400000,
    max: 20000000,
    step: 100000,
    defaultVal: 3200000
  },
  USD: {
    min: 100,
    max: 5000,
    step: 100,
    defaultVal: 800
  },
  EUR: {
    min: 100,
    max: 5000,
    step: 100,
    defaultVal: 750
  }
};

const convertCurrency = (val: number, fromCur: Currency, toCur: Currency): number => {
  if (fromCur === toCur) return val;
  return val * (CONVERSION_FACTORS[fromCur] / CONVERSION_FACTORS[toCur]);
};

const formatCurrency = (val: number, cur: Currency) => {
  if (cur === 'COP') {
    return `$${Math.round(val).toLocaleString('es-CO')} COP`;
  } else if (cur === 'USD') {
    return `$${Math.round(val).toLocaleString('en-US')} USD`;
  } else {
    return `€${Math.round(val).toLocaleString('de-DE')} EUR`;
  }
};

export default function AccelerationSolutions() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Modal open states
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [isTallyOpen, setIsTallyOpen] = useState<boolean>(false);

  // Modal 1: Calculator State
  const [currency, setCurrency] = useState<Currency>('COP');
  const [contacts, setContacts] = useState<number>(350);
  const [lostPercent, setLostPercent] = useState<number>(40);
  const [avgTicket, setAvgTicket] = useState<number>(3200000); // 3200000 COP by default (equivalent to 800 USD)

  const handleCurrencyChange = (newCur: Currency) => {
    const converted = convertCurrency(avgTicket, currency, newCur);
    const config = TICKET_SLIDER_CONFIGS[newCur];
    
    // Round to nearest step of the new currency config
    let rounded = Math.round(converted / config.step) * config.step;
    
    // Clamp within min and max boundaries
    rounded = Math.max(config.min, Math.min(config.max, rounded));
    
    setAvgTicket(rounded);
    setCurrency(newCur);
  };

  // Modal 2: WhatsApp State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Bienvenido al asistente virtual inteligente de Levanna. Soy el bot de demostración de Aceleración Digital. ¿Qué te gustaría probar hoy?',
      time: '12:00'
    }
  ]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Stable random particles properties generated once
  const [particles] = useState(() => 
    [...Array(18)].map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2 + 'px',
      height: Math.random() * 4 + 2 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      y: [0, Math.random() * -80 - 40, 0],
      x: [0, Math.random() * 60 - 30, 0],
      duration: Math.random() * 6 + 5
    }))
  );

  useEffect(() => {
    // Sync theme with prefers-color-scheme
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);
    const themeChangeHandler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener('change', themeChangeHandler);
      return () => darkModeMediaQuery.removeEventListener('change', themeChangeHandler);
    } else {
      // @ts-ignore
      darkModeMediaQuery.addListener(themeChangeHandler);
      // @ts-ignore
      return () => darkModeMediaQuery.removeListener(themeChangeHandler);
    }
  }, []);

  // Dynamically load Tally embed script
  useEffect(() => {
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Trigger Tally parser on modal open
  useEffect(() => {
    if (isTallyOpen && typeof window !== 'undefined' && (window as any).Tally) {
      setTimeout(() => {
        (window as any).Tally.loadEmbeds();
      }, 50);
    }
  }, [isTallyOpen]);

  // Scroll chat simulator to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // Theme-based colors to match Ecosistema section exactly
  const bgColor = isDark ? '#080C16' : 'var(--bg-primary)';
  const radialGradient = isDark 
    ? 'radial-gradient(circle at 50% 50%, rgba(26, 34, 51, 0.6) 0%, rgba(8, 12, 22, 1) 100%)'
    : 'radial-gradient(circle at 50% 50%, rgba(26, 34, 51, 0.03) 0%, var(--bg-secondary) 100%)';
  const textColor = isDark ? 'white' : 'var(--text-primary)';
  const textSubColor = isDark ? '#9CA3AF' : 'var(--text-secondary)';
  const cardBg = isDark 
    ? 'linear-gradient(145deg, rgba(30, 38, 56, 0.4) 0%, rgba(15, 20, 31, 0.6) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.75) 100%)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(26, 34, 51, 0.06)';
  const accentColor = '#1A2233'; // Petroleum Blue accent

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  // Modal 1: Calculator Math
  const lostContacts = Math.round(contacts * (lostPercent / 100));
  const monthlyLeakage = Math.round(lostContacts * avgTicket);
  const potentialSavingsMonthly = Math.round(monthlyLeakage * 0.3); // Recover 30%
  const potentialSavingsAnnual = potentialSavingsMonthly * 12;

  // Modal 2: WhatsApp Predefined Interactions
  const handleWhatsAppSelection = (optionText: string, botReplyText: string) => {
    if (isBotTyping) return;

    // 1. Add user message
    const userMsg: Message = {
      id: Date.now(),
      sender: 'client',
      text: optionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // 2. Trigger typing state
    setIsBotTyping(true);

    // 3. Trigger bot message after a delay
    setTimeout(() => {
      setIsBotTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleCustomMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isBotTyping) return;

    const userText = customInput.trim();
    setCustomInput('');

    // 1. Add user message
    const userMsg: Message = {
      id: Date.now(),
      sender: 'client',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // 2. Trigger typing state
    setIsBotTyping(true);

    // 3. Match keywords for a response
    let botResponse = "Excelente pregunta. Como parte de nuestras soluciones de Aceleración Digital, nos aseguramos de conectar de forma segura tus flujos de trabajo con bases de datos en la nube. ¿Te gustaría agendar un diagnóstico técnico gratuito haciendo clic en 'Consultar sobre mi proyecto' para analizar tu caso?";
    
    const normalizedText = userText.toLowerCase();
    if (normalizedText.includes('precio') || normalizedText.includes('costo') || normalizedText.includes('tarifa') || normalizedText.includes('cuanto vale') || normalizedText.includes('cuánto vale') || normalizedText.includes('cobran')) {
      botResponse = "Nuestras soluciones son a la medida de tu operación para garantizar el máximo retorno de inversión. Te sugiero completar nuestro diagnóstico rápido haciendo clic en 'Consultar sobre mi proyecto' para darte una cotización exacta.";
    } else if (normalizedText.includes('hola') || normalizedText.includes('buenas') || normalizedText.includes('saludos') || normalizedText.includes('buenos dias') || normalizedText.includes('buenos días')) {
      botResponse = "¡Hola! Qué gusto saludarte. Soy el asistente de Aceleración Digital de Levanna. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre automatizaciones, bases de datos o integraciones.";
    } else if (normalizedText.includes('integracion') || normalizedText.includes('integración') || normalizedText.includes('crm') || normalizedText.includes('api') || normalizedText.includes('database') || normalizedText.includes('sheets') || normalizedText.includes('postgres') || normalizedText.includes('sql') || normalizedText.includes('excel')) {
      botResponse = "Soportamos integraciones nativas con PostgreSQL, SQL Server, Google Sheets, HubSpot, Salesforce y cualquier software contable o ERP vía API REST o Webhooks en tiempo real.";
    } else if (normalizedText.includes('contacto') || normalizedText.includes('telefono') || normalizedText.includes('teléfono') || normalizedText.includes('hablar con persona') || normalizedText.includes('asesor')) {
      botResponse = "¡Claro que sí! Puedes comunicarte con un asesor de inmediato haciendo clic en 'Consultar sobre mi proyecto' o a través de nuestro botón de WhatsApp principal. ¡Estamos listos para impulsar tu negocio!";
    }

    // 4. Trigger bot message after a delay
    setTimeout(() => {
      setIsBotTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <section 
      id="aceleracion-digital" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        background: bgColor, 
        overflow: 'hidden', 
        padding: '6rem 0',
        transition: 'background 0.3s ease' 
      }}
    >
      {/* Background Radial Glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: radialGradient, pointerEvents: 'none', zIndex: 0 }} />

      {/* Floating Particles ('Luciérnagas') for continuity */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {particles.map((p) => (
          <motion.div
            key={`particle-acel-${p.id}`}
            style={{
              position: 'absolute',
              width: p.width,
              height: p.height,
              background: isDark ? 'rgba(255, 255, 255, 0.9)' : accentColor,
              borderRadius: '50%',
              left: p.left,
              top: p.top,
              boxShadow: isDark ? '0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px #00E5FF' : 'none',
              pointerEvents: 'none',
            }}
            animate={{
              y: p.y,
              x: p.x,
              opacity: isDark ? [0.2, 1, 0.2] : [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div 
            className="badge animate-slide-up" 
            style={{ 
              marginBottom: '1rem', 
              background: isDark ? 'rgba(0, 229, 255, 0.08)' : 'rgba(26, 34, 51, 0.05)', 
              borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : 'rgba(26, 34, 51, 0.1)',
              color: isDark ? '#00E5FF' : accentColor
            }}
          >
            Servicios a la Medida
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: textColor, margin: '0 auto 1rem auto', maxWidth: '800px', fontWeight: 800 }}>
            Soluciones de <span className="text-gradient">Aceleración Digital</span>
          </h2>
          <p style={{ color: textSubColor, fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
            Diseñamos puentes digitales de alto rendimiento orientados a captar leads, automatizar tus ventas y sincronizar tu operación 24/7.
          </p>
        </div>

        {/* Bento Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '2rem',
            width: '100%'
          }}
        >
          {/* Card 1: Landing Pages of High Conversion */}
          <motion.div
            variants={cardVariants}
            onHoverStart={() => setActiveCard(1)}
            onHoverEnd={() => setActiveCard(null)}
            onClick={() => setIsCalculatorOpen(true)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: cardBg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${cardBorder}`,
              borderRadius: '28px',
              padding: '2.5rem',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.03)',
              cursor: 'pointer',
            }}
            className="bento-card-7"
          >
            <div style={{ position: 'relative', zIndex: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  background: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(26, 34, 51, 0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: isDark ? '#00E5FF' : accentColor
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: isDark ? '#00E5FF' : accentColor }}>Conversión 24/7</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: textColor, marginBottom: '1rem', fontWeight: 700 }}>Landing Pages de Alta Conversión</h3>
              <p style={{ color: textSubColor, fontSize: '1rem', lineHeight: '1.6', maxWidth: '480px', marginBottom: '2rem' }}>
                Diseño One-Page orientado a captar leads y cerrar ventas 24/7. Tu vitrina digital, optimizada para dispositivos móviles.
              </p>
            </div>

            {/* Interactive Visual Graphic for Card 1 */}
            <div style={{ 
              height: '180px', 
              width: '100%', 
              background: isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.02)', 
              borderRadius: '20px', 
              position: 'relative', 
              overflow: 'hidden', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '0 2rem'
            }}>
              {/* Web Browser Frame Mockup */}
              <div style={{
                width: '100%',
                height: '150px',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'white',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                borderBottom: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                {/* Browser Title Bar */}
                <div style={{ 
                  height: '24px', 
                  width: '100%', 
                  background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#F1F5F9', 
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  gap: '5px'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></div>
                  <div style={{ 
                    height: '12px', 
                    width: '120px', 
                    background: isDark ? 'rgba(0,0,0,0.2)' : 'white', 
                    borderRadius: '4px',
                    marginLeft: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '7px', color: '#94A3B8' }}>levanna.com/tu-vitrina</span>
                  </div>
                </div>

                {/* Browser Content Preview */}
                <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '40%', height: '8px', background: 'var(--accent-gradient)', borderRadius: '4px' }}></div>
                    <div style={{ width: '20%', height: '8px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ width: '80%', height: '5px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '4px' }}></div>
                  <div style={{ width: '65%', height: '5px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '4px' }}></div>

                  {/* Tiny Graph */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    gap: '6px', 
                    marginTop: '8px',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
                    paddingBottom: '4px',
                    position: 'relative'
                  }}>
                    <svg viewBox="0 0 100 30" style={{ width: '100%', height: '100%', overflow: 'visible', position: 'absolute', bottom: '4px', left: 0 }}>
                      <motion.path 
                        d="M0 25 Q 20 5, 40 18 T 80 5 T 100 2"
                        fill="none" 
                        stroke="#00E5FF" 
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: activeCard === 1 ? 1 : 0.85 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      {/* Gradient glow under the line */}
                      <path 
                        d="M0 25 Q 20 5, 40 18 T 80 5 T 100 2 L 100 30 L 0 30 Z" 
                        fill="url(#sparkGradient)" 
                        opacity="0.15" 
                      />
                      <defs>
                        <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00E5FF" />
                          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ width: '100%', height: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Floating conversion badge */}
              <motion.div 
                animate={{ 
                  y: activeCard === 1 ? [-5, -12, -5] : [0, -4, 0],
                  scale: activeCard === 1 ? 1.05 : 1
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '25px',
                  background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#10B981',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'transparent'}`,
                  borderRadius: '10px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFF', display: 'inline-block', boxShadow: '0 0 8px #FFF' }}></span>
                +320% Leads
              </motion.div>
            </div>

            {/* Stable and fluid CTA container */}
            <div style={{ height: '48px', width: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ 
                  opacity: activeCard === 1 ? 1 : 0, 
                  y: activeCard === 1 ? 0 : 10, 
                  scale: activeCard === 1 ? 1 : 0.95 
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%' }}
              >
                <button 
                  className="btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCalculatorOpen(true);
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1.5rem', 
                    fontSize: '0.95rem',
                    justifyContent: 'center',
                    background: accentColor,
                    boxShadow: 'none',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  Ver impacto
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </motion.div>
              
              {/* Static visual cue when not hovered to keep premium look */}
              <AnimatePresence>
                {activeCard !== 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      position: 'absolute', 
                      left: 0, 
                      color: isDark ? '#00E5FF' : accentColor, 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>Conoce el impacto</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 2: WhatsApp Virtual Assistant */}
          <motion.div
            variants={cardVariants}
            onHoverStart={() => setActiveCard(2)}
            onHoverEnd={() => setActiveCard(null)}
            onClick={() => setIsWhatsAppOpen(true)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: cardBg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${cardBorder}`,
              borderRadius: '28px',
              padding: '2.5rem',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.03)',
              cursor: 'pointer',
            }}
            className="bento-card-5"
          >
            <div style={{ position: 'relative', zIndex: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  background: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(26, 34, 51, 0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: isDark ? '#00E5FF' : accentColor
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: isDark ? '#00E5FF' : accentColor }}>Atención con IA</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: textColor, marginBottom: '1rem', fontWeight: 700 }}>Asistente Virtual por WhatsApp</h3>
              <p style={{ color: textSubColor, fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Vendedor 24/7. Automatiza respuestas, captura pedidos y fideliza a tus clientes con IA. No pierdas ni una sola venta.
              </p>
            </div>

            {/* Interactive Visual Graphic for Card 2 */}
            <div style={{ 
              height: '180px', 
              width: '100%', 
              background: isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.02)', 
              borderRadius: '20px', 
              position: 'relative', 
              overflow: 'hidden', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '10px'
            }}>
              {/* WhatsApp Interface Mockup */}
              <div style={{
                width: '100%',
                flex: 1,
                background: isDark ? '#0b141a' : '#efeae2',
                borderRadius: '12px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                {/* Chat Header */}
                <div style={{
                  height: '32px',
                  background: isDark ? '#1f2c34' : '#075e54',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  justifyContent: 'space-between',
                  color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.63 1.97 14.17 .947 11.993.947 6.559.947 2.134 5.32 2.13 10.748c-.001 1.71.463 3.38 1.343 4.878l-.997 3.642 3.73-.974h.023z"/></svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600 }}>Levanna AI Bot</span>
                      <span style={{ fontSize: '6px', color: '#8696a0', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#25D366', display: 'inline-block' }}></span>
                        En línea
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: '7px', background: 'rgba(255,255,255,0.15)', padding: '2px 5px', borderRadius: '4px', fontWeight: 700 }}>
                    DEMO IA
                  </div>
                </div>

                {/* Messages Body */}
                <div style={{ padding: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
                  {/* Bubble 1 (Left - Client) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      alignSelf: 'flex-start',
                      background: isDark ? '#1f2c34' : 'white',
                      borderRadius: '8px',
                      borderTopLeftRadius: '0px',
                      padding: '5px 8px',
                      maxWidth: '85%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    <p style={{ fontSize: '7px', margin: 0, color: isDark ? '#e9edef' : '#111b21', lineHeight: 1.3 }}>
                      Hola, ¿tienen disponibilidad de entrega para mañana?
                    </p>
                  </motion.div>

                  {/* Bubble 2 (Right - Bot) */}
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: activeCard === 2 ? 1 : 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      alignSelf: 'flex-end',
                      background: isDark ? '#005c4b' : '#d9fdd3',
                      borderRadius: '8px',
                      borderTopRightRadius: '0px',
                      padding: '5px 8px',
                      maxWidth: '85%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}
                  >
                    <p style={{ fontSize: '7px', margin: 0, color: isDark ? '#e9edef' : '#111b21', lineHeight: 1.3 }}>
                      ¡Hola! Sí, confirmamos stock disponible. ¿Qué cantidad necesitas reservar?
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stable and fluid CTA container */}
            <div style={{ height: '48px', width: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ 
                  opacity: activeCard === 2 ? 1 : 0, 
                  y: activeCard === 2 ? 0 : 10, 
                  scale: activeCard === 2 ? 1 : 0.95 
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%' }}
              >
                <button 
                  className="btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWhatsAppOpen(true);
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1.5rem', 
                    fontSize: '0.95rem',
                    justifyContent: 'center',
                    background: accentColor,
                    boxShadow: 'none',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  Ver demo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
              </motion.div>
              
              {/* Static visual cue when not hovered */}
              <AnimatePresence>
                {activeCard !== 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      position: 'absolute', 
                      left: 0, 
                      color: isDark ? '#00E5FF' : accentColor, 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>Interactuar con demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 3: Process Automation (F2) */}
          <motion.div
            variants={cardVariants}
            onHoverStart={() => setActiveCard(3)}
            onHoverEnd={() => setActiveCard(null)}
            onClick={() => setIsTallyOpen(true)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: cardBg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${cardBorder}`,
              borderRadius: '28px',
              padding: '2.5rem',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.03)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 5 }}>
              <div style={{ flex: '1 1 450px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '12px', 
                    background: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(26, 34, 51, 0.05)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isDark ? '#00E5FF' : accentColor
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11.37 12 15 9 12"/></svg>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: isDark ? '#00E5FF' : accentColor }}>Sincronización Total (F2)</span>
                </div>
                <h3 style={{ fontSize: '1.8rem', color: textColor, marginBottom: '1rem', fontWeight: 800 }}>Automatización de Procesos</h3>
                <p style={{ color: textSubColor, fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '580px' }}>
                  Sincroniza tu operación de inmediato. Conectamos tus flujos de trabajo con bases de datos reales para eliminar el error manual y proteger tu rentabilidad.
                </p>
              </div>

              {/* Stable and fluid CTA container at the bottom */}
              <div style={{ height: '48px', width: '220px', display: 'flex', alignItems: 'center', position: 'relative', flexShrink: 0 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ 
                    opacity: activeCard === 3 ? 1 : 0, 
                    y: activeCard === 3 ? 0 : 10, 
                    scale: activeCard === 3 ? 1 : 0.95 
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%' }}
                >
                  <button 
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTallyOpen(true);
                    }}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1.5rem', 
                      fontSize: '0.95rem',
                      justifyContent: 'center',
                      background: accentColor,
                      boxShadow: 'none',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Consultar proyecto
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </motion.div>
                
                {/* Static visual cue when not hovered */}
                <AnimatePresence>
                  {activeCard !== 3 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      style={{ 
                        position: 'absolute', 
                        left: 0, 
                        color: isDark ? '#00E5FF' : accentColor, 
                        fontSize: '0.95rem', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Habla con un asesor</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Visual Flow Dashboard for Card 3 */}
            <div style={{ 
              height: '180px', 
              width: '100%', 
              background: isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.02)', 
              borderRadius: '20px', 
              position: 'relative', 
              overflow: 'hidden', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 3rem',
              gap: '2rem'
            }}>
              {/* Left Side: Input Form Interface */}
              <div style={{
                width: '160px',
                height: '120px',
                background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'white',
                borderRadius: '12px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, paddingBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: '#3B82F6' }}></div>
                  <span style={{ fontSize: '8px', fontWeight: 600, color: textColor }}>Input Operativo</span>
                </div>
                <div style={{ width: '100%', height: '14px', background: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                  <span style={{ fontSize: '6px', color: '#94A3B8' }}>Obra Central</span>
                </div>
                <div style={{ width: '100%', height: '14px', background: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                  <span style={{ fontSize: '6px', color: '#94A3B8' }}>Gasto: $1,250 USD</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '16px', 
                  background: isDark ? 'rgba(0, 229, 255, 0.15)' : accentColor, 
                  borderRadius: '4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: isDark ? '1px solid rgba(0, 229, 255, 0.3)' : 'none'
                }}>
                  <span style={{ fontSize: '7px', color: 'white', fontWeight: 700 }}>Enviar y Sincronizar</span>
                </div>
              </div>

              {/* Center Connection: SVG Flow Lines with traveling particles */}
              <div style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <path 
                    id="flowPath1"
                    d="M0 20 L 100 20" 
                    fill="none" 
                    stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 34, 51, 0.06)"} 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                  {activeCard === 3 && (
                    <>
                      <motion.path 
                        d="M0 20 L 100 20" 
                        fill="none" 
                        stroke="#00E5FF" 
                        strokeWidth="2.5" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <circle r="3" fill="#00E5FF">
                        <animateMotion dur="2s" repeatCount="indefinite">
                          <mpath href="#flowPath1" />
                        </animateMotion>
                      </circle>
                    </>
                  )}
                </svg>
                {/* Central F2 Hub Node (Strictly Anchored to Center) */}
                <div style={{
                  position: 'absolute',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isDark ? '#0b1424' : 'white',
                  border: activeCard === 3 ? '2px solid #00E5FF' : '2px solid rgba(0, 229, 255, 0.3)',
                  boxShadow: activeCard === 3 ? '0 0 25px rgba(0, 229, 255, 0.6)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 3,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: isDark ? '#00E5FF' : accentColor }}>F2</span>
                </div>
              </div>

              {/* Right Side: Database Matrix Display */}
              <div style={{
                width: '160px',
                height: '120px',
                background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'white',
                borderRadius: '12px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></div>
                    <span style={{ fontSize: '7px', fontWeight: 600, color: textColor }}>PostgreSQL DB</span>
                  </div>
                  <span style={{ fontSize: '6px', color: '#10B981', fontWeight: 600 }}>LIVE SYNC</span>
                </div>
                
                {/* Simulated database rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { id: '1024', item: 'Pintura Obra', val: '$1,250', status: 'Sincronizado' },
                    { id: '1023', item: 'Caja Menor', val: '$320', status: 'Sincronizado' },
                    { id: '1022', item: 'Acceso QR', val: 'Check-In', status: 'Sincronizado' }
                  ].map((row, idx) => (
                    <div 
                      key={row.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: '4px', 
                        background: idx === 0 && activeCard === 3 ? (isDark ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.04)') : 'transparent',
                        borderRadius: '3px',
                        transition: 'background 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '5px', color: '#94A3B8' }}>#{row.id}</span>
                      <span style={{ fontSize: '5px', color: textColor, fontWeight: 500 }}>{row.item}</span>
                      <span style={{ fontSize: '5px', color: textColor, fontWeight: 600 }}>{row.val}</span>
                      <span style={{ fontSize: '5px', color: '#10B981', fontWeight: 600 }}>{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* -------------------- MODALES INTERACTIVOS -------------------- */}

      {/* Modal 1: Calculador de Oportunidad Comercial */}
      <Modal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)}>
        <div style={{ color: textColor }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '54px', 
              height: '54px', 
              borderRadius: '16px', 
              background: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(26, 34, 51, 0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              color: isDark ? '#00E5FF' : accentColor
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="16" x2="16" y2="22"/><line x1="12" y1="16" x2="12" y2="22"/></svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Calculadora de Oportunidad Comercial</h2>
            <p style={{ color: textSubColor, fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Evalúa el impacto financiero de las oportunidades y contactos perdidos en tu operación.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '1rem' }}>
            {/* Left Column: Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, 
                paddingBottom: '0.5rem' 
              }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Parámetros Mensuales</h3>
                
                {/* Currency Selector Pill */}
                <div style={{
                  display: 'flex',
                  background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(26, 34, 51, 0.04)',
                  borderRadius: '10px',
                  padding: '3px',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(26, 34, 51, 0.08)'}`
                }}>
                  {(['COP', 'USD', 'EUR'] as Currency[]).map((cur) => {
                    const isSelected = currency === cur;
                    return (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => handleCurrencyChange(cur)}
                        style={{
                          background: isSelected 
                            ? (isDark ? 'rgba(0, 229, 255, 0.15)' : '#1A2233') 
                            : 'transparent',
                          color: isSelected 
                            ? (isDark ? '#00E5FF' : 'white') 
                            : (isDark ? '#9CA3AF' : '#4B5563'),
                          border: 'none',
                          borderRadius: '7px',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        {cur}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Slider 1: Contacts */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <span>Contactos Recibidos</span>
                  <span style={{ color: '#00E5FF' }}>{contacts} leads</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="2000" 
                  step="50"
                  value={contacts} 
                  onChange={(e) => setContacts(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#00E5FF', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
                  <span>50</span>
                  <span>2000</span>
                </div>
              </div>

              {/* Slider 2: Lost % */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <span>Porcentaje que estimas perder</span>
                  <span style={{ color: '#EF4444' }}>{lostPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  step="5"
                  value={lostPercent} 
                  onChange={(e) => setLostPercent(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
                  <span>10%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* Slider 3: Average Ticket */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <span>Valor de venta promedio</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>{formatCurrency(avgTicket, currency)}</span>
                </div>
                <input 
                  type="range" 
                  min={TICKET_SLIDER_CONFIGS[currency].min} 
                  max={TICKET_SLIDER_CONFIGS[currency].max} 
                  step={TICKET_SLIDER_CONFIGS[currency].step}
                  value={avgTicket} 
                  onChange={(e) => setAvgTicket(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
                  <span>{formatCurrency(TICKET_SLIDER_CONFIGS[currency].min, currency)}</span>
                  <span>{formatCurrency(TICKET_SLIDER_CONFIGS[currency].max, currency)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dashboard Calculations */}
            <div style={{ 
              background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(26, 34, 51, 0.03)', 
              borderRadius: '20px', 
              padding: '1.5rem', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,34,51,0.06)'}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>Análisis de Impacto</h3>
                
                {/* Metric 1: Lost contacts count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: textSubColor }}>Leads perdidos al mes:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#EF4444' }}>{lostContacts} leads</span>
                </div>

                {/* Metric 2: Monthly leakage */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: textSubColor }}>Fuga económica mensual:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#EF4444' }}>{formatCurrency(monthlyLeakage, currency)}</span>
                </div>

                <div style={{ margin: '1.5rem 0', height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}></div>

                {/* Highlight metric: Potential annual savings with 30% recovery */}
                <div style={{ 
                  background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)', 
                  border: '1px solid rgba(16, 185, 129, 0.25)', 
                  borderRadius: '16px',
                  padding: '1.2rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#10B981', display: 'block', marginBottom: '4px' }}>
                    Ahorro potencial con Levanna (recuperando solo 30%)
                  </span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981', textShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
                    +{formatCurrency(potentialSavingsAnnual, currency)} /año
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button 
                  onClick={() => {
                    setIsCalculatorOpen(false);
                    setIsTallyOpen(true);
                  }}
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Recuperar estos ingresos
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button 
                  onClick={() => setIsCalculatorOpen(false)}
                  className="btn-secondary" 
                  style={{ width: '100%', padding: '0.8rem 1.5rem', fontSize: '0.95rem' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal 2: Simulador de WhatsApp */}
      <Modal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '650px', color: textColor }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Simulador de WhatsApp Levanna</h2>
            <p style={{ color: textSubColor, fontSize: '0.9rem' }}>
              Experimenta de primera mano cómo responde nuestro bot inteligente en tiempo real.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
            {/* Left: Mobile phone mockup */}
            <div style={{ 
              background: isDark ? '#0b141a' : '#efeae2', 
              borderRadius: '24px', 
              border: `4px solid ${isDark ? '#1f2c34' : '#075e54'}`,
              overflow: 'hidden', 
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              {/* WhatsApp phone Header */}
              <div style={{ 
                height: '48px', 
                background: isDark ? '#1f2c34' : '#075e54', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 12px',
                justifyContent: 'space-between',
                color: 'white',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'transparent'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.63 1.97 14.17 .947 11.993.947 6.559.947 2.134 5.32 2.13 10.748c-.001 1.71.463 3.38 1.343 4.878l-.997 3.642 3.73-.974h.023z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700 }}>Asistente Levanna</div>
                    <span style={{ fontSize: '8px', color: isBotTyping ? '#25D366' : '#8696a0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: isBotTyping ? '#25D366' : '#8696a0', display: 'inline-block' }}></span>
                      {isBotTyping ? 'Escribiendo...' : 'En línea'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Feed */}
              <div style={{ padding: '12px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{
                      alignSelf: msg.sender === 'client' ? 'flex-end' : 'flex-start',
                      background: msg.sender === 'client' ? (isDark ? '#005c4b' : '#d9fdd3') : (isDark ? '#1f2c34' : 'white'),
                      borderRadius: '10px',
                      borderTopRightRadius: msg.sender === 'client' ? '0px' : '10px',
                      borderTopLeftRadius: msg.sender === 'client' ? '10px' : '0px',
                      padding: '8px 12px',
                      maxWidth: '85%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                      position: 'relative'
                    }}
                  >
                    <p style={{ fontSize: '9px', margin: 0, color: isDark ? '#e9edef' : '#111b21', lineHeight: 1.35 }}>
                      {msg.text}
                    </p>
                    <span style={{ fontSize: '6px', color: isDark ? '#8696a0' : '#667781', display: 'block', textAlign: 'right', marginTop: '3px' }}>
                      {msg.time}
                    </span>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isBotTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      alignSelf: 'flex-start',
                      background: isDark ? '#1f2c34' : 'white',
                      borderRadius: '10px',
                      borderTopLeftRadius: '0px',
                      padding: '8px 12px',
                      maxWidth: '50px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px'
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8696a0', animation: 'blink 1.4s infinite both' }}></span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8696a0', animation: 'blink 1.4s infinite both 0.2s' }}></span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8696a0', animation: 'blink 1.4s infinite both 0.4s' }}></span>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={handleCustomMessageSubmit}
                style={{
                  padding: '8px',
                  background: isDark ? '#1f2c34' : '#f0f2f5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                }}
              >
                <input 
                  type="text" 
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  disabled={isBotTyping}
                  style={{
                    flex: 1,
                    background: isDark ? '#2a3942' : 'white',
                    border: 'none',
                    borderRadius: '18px',
                    padding: '6px 12px',
                    fontSize: '10px',
                    color: isDark ? '#e9edef' : '#111b21',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={isBotTyping || !customInput.trim()}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#00a884',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: isBotTyping || !customInput.trim() ? 'not-allowed' : 'pointer',
                    opacity: isBotTyping || !customInput.trim() ? 0.6 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </form>
            </div>

            {/* Right: Quick replies triggers */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, paddingBottom: '4px' }}>
                  Selecciona una consulta de prueba:
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    {
                      q: "💼 ¿Cómo ayudas a empresas del sector construcción/industrial?",
                      a: "Automatizamos todo el flujo operativo en obra: desde el registro biométrico y por código QR del personal sin planillas de papel, hasta el control de gastos de campo por WhatsApp integrado con IA. Toda tu operación se sincroniza en vivo con tu Hub Central."
                    },
                    {
                      q: "🤖 Simula el registro automático de una compra",
                      a: "¡Pedido iniciado! Nuestro bot procesa la imagen de la factura que envíes, extrae los ítems comprados mediante IA, los compara con tu presupuesto base de obra y, si está autorizado, sincroniza el gasto directamente en PostgreSQL."
                    },
                    {
                      q: "⚡ ¿Qué integraciones y base de datos soportas?",
                      a: "Soportamos bases de datos PostgreSQL, SQL Server, MySQL y Google Sheets. Nos integramos con tus sistemas ERPs a través de Webhooks dinámicos y APIs REST completas con encriptación SSL de nivel financiero."
                    }
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      disabled={isBotTyping}
                      onClick={() => handleWhatsAppSelection(option.q, option.a)}
                      style={{
                        background: isDark ? 'rgba(26, 34, 51, 0.4)' : 'white',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: '12px',
                        padding: '10px 14px',
                        textAlign: 'left',
                        color: textColor,
                        fontSize: '0.8rem',
                        lineHeight: 1.4,
                        cursor: isBotTyping ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: 'var(--shadow-soft)'
                      }}
                      onMouseOver={(e) => { if (!isBotTyping) e.currentTarget.style.borderColor = '#00E5FF' }}
                      onMouseOut={(e) => { if (!isBotTyping) e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                    >
                      {option.q}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <button 
                  onClick={() => {
                    setIsWhatsAppOpen(false);
                    setIsTallyOpen(true);
                  }}
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '0.7rem 1.5rem' }}
                >
                  Consultar sobre mi proyecto
                </button>
                <button 
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="btn-secondary" 
                  style={{ width: '100%', padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal 3: Embed de Tally (Diagnóstico Técnico) */}
      <Modal isOpen={isTallyOpen} onClose={() => setIsTallyOpen(false)}>
        <div style={{ color: textColor }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Diagnóstico de Operación</h2>
            <p style={{ color: textSubColor, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Evalúa tus flujos de trabajo con bases de datos reales. Completa el diagnóstico en 3 minutos.
            </p>
          </div>

          <div style={{ 
            width: '100%', 
            borderRadius: '20px', 
            overflow: 'hidden', 
            background: isDark ? 'rgba(8, 12, 22, 0.6)' : 'white',
            border: `2px solid ${isDark ? 'rgba(26, 34, 51, 0.8)' : 'rgba(26, 34, 51, 0.15)'}`,
            boxShadow: '0 8px 32px rgba(26, 34, 51, 0.08), inset 0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <iframe 
              data-tally-src="https://tally.so/embed/ob7111?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="480" 
              frameBorder={0} 
              marginHeight={0} 
              marginWidth={0} 
              title="Diagnóstico Técnico Aceleración" 
              style={{ border: 'none', display: 'block' }}
            ></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button 
              onClick={() => setIsTallyOpen(false)}
              className="btn-secondary" 
              style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}
            >
              Cerrar Diagnóstico
            </button>
          </div>
        </div>
      </Modal>

      {/* Global CSS styles injected for custom animations and responsive design */}
      <style>{`
        /* Desktop: Bento Layout distribution */
        @media (min-width: 1024px) {
          .bento-card-7 {
            grid-column: span 7 !important;
          }
          .bento-card-5 {
            grid-column: span 5 !important;
          }
        }
        
        /* Glassmorphism custom card panel hover shadow override */
        #aceleracion-digital .bento-card-7, 
        #aceleracion-digital .bento-card-5 {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        #aceleracion-digital .bento-card-7:hover {
          border-color: ${isDark ? 'rgba(0, 229, 255, 0.3)' : 'rgba(26, 34, 51, 0.15)'} !important;
          box-shadow: ${isDark ? '0 20px 40px rgba(0, 229, 255, 0.12), 0 0 30px rgba(0,0,0,0.5)' : '0 15px 35px rgba(26, 34, 51, 0.08)'} !important;
        }

        #aceleracion-digital .bento-card-5:hover {
          border-color: ${isDark ? 'rgba(0, 229, 255, 0.3)' : 'rgba(26, 34, 51, 0.15)'} !important;
          box-shadow: ${isDark ? '0 20px 40px rgba(0, 229, 255, 0.12), 0 0 30px rgba(0,0,0,0.5)' : '0 15px 35px rgba(26, 34, 51, 0.08)'} !important;
        }

        /* WhatsApp Chat typing animation */
        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
      `}</style>
    </section>
  );
}
