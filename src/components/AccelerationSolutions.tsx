import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccelerationSolutions() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Generate stable random properties for particles once
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
              // Desktop: span 7
              // Tablet/Mobile: handled via inline styles below or standard grid wrapping
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
              // Desktop: span 5
              // Tablet/Mobile: handled via inline styles below or standard grid wrapping
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

                  {/* Bubble 3 (Typing Simulation / Response) */}
                  <AnimatePresence>
                    {activeCard === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1.2 }}
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
                        <p style={{ fontSize: '7px', margin: 0, color: isDark ? '#e9edef' : '#111b21', lineHeight: 1.3, fontWeight: 600 }}>
                          📝 15 unidades de LEV-WEB
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              // Desktop: span 12 (wide bottom row)
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
                {/* Central F2 Hub Node */}
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
                  zIndex: 3
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

      {/* Global CSS styles injected for custom breakpoints and styles */}
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
      `}</style>
    </section>
  );
}
