import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';

interface Product {
  title: string;
  code: string;
  desc: string;
  image?: string;
  status: 'Operativa' | 'En Desarrollo';
  demoUrl?: string;
}



export default function Features() {
  const [activeApp, setActiveApp] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);
    const themeChangeHandler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    // Fallback for some browsers
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

  const products: Product[] = [
    { 
      title: 'Hub Central', 
      code: 'LEV-WEB-HUB-SAAS',
      status: 'Operativa',
      desc: 'El centro neurálgico de tu operación. Una plataforma SaaS integral que conecta todos los módulos de Levanna, permitiendo una visión 360° de tus proyectos, gestión de usuarios y analítica en tiempo real.', 
      image: '/levanna-logo-hub.png',
      demoUrl: 'https://www.youtube.com/embed/wdUTOI4d2_U'
    },
    { 
      title: 'Control de Acceso Inteligente', 
      code: 'LEV-SEC-ACC-QR',
      status: 'Operativa',
      desc: 'El fin de la infraestructura costosa y las planillas de papel. Nuestra aplicación nativa transforma la gestión de personal en obra o en oficina sin requerir equipos físicos ni mantenimientos. Gestiona las horas laboradas de tu equipo con precisión y recibe alertas de seguridad automáticas.', 
      image: '/apps/control-acceso.png',
      demoUrl: 'https://www.youtube.com/embed/0SQowfSg0Cs'
    },
    { 
      title: 'Caja Menor + IA', 
      code: 'LEV-OPS-BOT-TG',
      status: 'Operativa',
      desc: 'Auditoría y control de gastos de campo, ahora en su propia App. Evolucionamos nuestra gestión financiera dejando atrás los reportes por WhatsApp. Con nuestra aplicación tienes el control absoluto: verifica registros, bloquea gastos no autorizados y mantén un historial inmutable.', 
      image: '/apps/caja-menor.png',
      demoUrl: 'https://www.youtube.com/embed/5LXf4Xbt7_g'
    },
    { 
      title: 'Bóveda Documental', 
      code: 'LEV-DOC-VAU-SB',
      status: 'Operativa',
      desc: 'La única fuente de verdad. Unificación de esquemas de trabajo, planos, versiones, registro fotográfico y contratos en la nube con acceso en tiempo real. Adiós a la dispersión de información y los archivos perdidos en cadenas de correo.', 
      image: '/apps/boveda.png' 
    },
    { 
      title: 'Asistente de Reuniones', 
      code: 'LEV-MGT-AI-MEET',
      status: 'Operativa',
      desc: 'Tu copiloto inteligente para comités y recorridos de obra. Nuestro asistente transcribe de forma inteligente tus juntas, identificando los puntos clave para delegar tareas automáticamente y rastrear su cumplimiento. Genera resúmenes ejecutivos precisos al instante.', 
      image: '/apps/asistente-reuniones.png',
      demoUrl: 'https://www.youtube.com/embed/P04NZYsW8Y0' 
    },
    { 
      title: 'Asistente de Licitaciones', 
      code: 'LEV-BIZ-AI-BID',
      status: 'En Desarrollo',
      desc: 'Análisis automatizado de pliegos. Identificamos riesgos legales, evaluamos viabilidad y extraemos hitos críticos en segundos para que nunca pierdas una oportunidad. Centraliza todo el proceso de participación en un solo entorno colaborativo.', 
      image: '/apps/licitaciones.png' 
    },
    { 
      title: 'Control Presupuestal', 
      code: 'LEV-FIN-CTL-BGT',
      status: 'Operativa',
      desc: 'Inteligencia predictiva enfocada en tu proyecto. Cruza automáticamente tu planeación de MS Project con el gasto real ejecutado, sin doble digitación. Anticipa sobrecostos, audita cortes al instante y visualiza la salud financiera de tu proyecto en tiempo real.', 
      image: '/apps/control-presupuestal.png',
      demoUrl: 'https://www.youtube.com/embed/G60VuqaZ4KI'
    }
  ];

  const nodePositions = [
    { x: 28, y: 28, isRightSide: false },   // Top Left
    { x: 62, y: 25, isRightSide: true },    // Top Right
    { x: 22, y: 55, isRightSide: false },   // Bottom Left
    { x: 40, y: 75, isRightSide: false },   // Bottom Center-Left
    { x: 55, y: 72, isRightSide: true },    // Bottom Center-Right
    { x: 75, y: 48, isRightSide: true },    // Right
  ];
  
  const centerPos = { x: 45, y: 48 };

  // Dynamic positioning for the HUD Card to avoid blocking nodes
  const activeNodeIsRight = activeApp > 0 
    ? (nodePositions[activeApp - 1]?.isRightSide ?? false)
    : false;
  const cardPositionStyle = activeNodeIsRight 
    ? { left: '5%', bottom: '5%' } 
    : { right: '3%', bottom: '5%' };

  // Theme-based colors
  const bgColor = isDark ? '#080C16' : 'var(--bg-secondary)';
  const radialGradient = isDark 
    ? 'radial-gradient(circle at 45% 48%, rgba(0, 112, 243, 0.12) 0%, rgba(8, 12, 22, 1) 65%)'
    : 'radial-gradient(circle at 45% 48%, rgba(0, 112, 243, 0.05) 0%, var(--bg-secondary) 65%)';
  const ringColor1 = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
  const ringColor2 = isDark ? 'rgba(0, 112, 243, 0.08)' : 'rgba(0, 112, 243, 0.1)';
  const ringColor3 = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const nodeBgInactive = isDark ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.9)';
  const nodeBorderInactive = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const textColor = isDark ? 'white' : 'var(--text-primary)';
  const textSubColor = isDark ? '#E5E7EB' : 'var(--text-secondary)';
  const cardBg = isDark 
    ? 'linear-gradient(145deg, rgba(30, 38, 56, 0.6) 0%, rgba(15, 20, 31, 0.8) 100%)'
    : 'rgba(255, 255, 255, 0.85)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <section id="soluciones-ia" className="unified-bg-section" style={{ position: 'relative', width: '100%', minHeight: isMobile ? 'auto' : '900px', background: bgColor, overflow: 'hidden', padding: isMobile ? '4rem 1rem' : '0', transition: 'background 0.3s ease' }}>
       
       {/* Background Deep Space & Rings */}
       <div className="section-bg-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: radialGradient, pointerEvents: 'none' }} />
       
       {/* Giant Orbital Rings */}
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '900px', height: '900px', borderRadius: '50%', border: `1px solid ${ringColor1}`, pointerEvents: 'none' }} />
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', borderRadius: '50%', border: `1px solid ${ringColor2}`, boxShadow: isDark ? 'inset 0 0 80px rgba(0,112,243,0.03)' : 'none', pointerEvents: 'none' }} />
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '450px', height: '450px', borderRadius: '50%', border: `1px dashed ${ringColor3}`, pointerEvents: 'none' }} />

       {/* Interactive Layer */}
       {!isMobile ? (
         <div style={{ position: 'absolute', width: '100%', height: '100%', maxWidth: '1400px', margin: '0 auto', left: 0, right: 0 }}>
            
            {/* Title overlay */}
            <div style={{ position: 'absolute', top: '5%', left: '5%', zIndex: 40 }}>
              <h2 style={{ fontSize: '2.8rem', color: textColor, margin: 0, textShadow: isDark ? '0 0 20px rgba(0,0,0,0.5)' : 'none' }}>
                Ecosistema <span className="text-gradient">Levanna</span>
              </h2>
              <p style={{ color: isDark ? '#9CA3AF' : 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', marginTop: '0.5rem' }}>
                Selecciona un nodo para explorar la interconexión de nuestras herramientas.
              </p>
            </div>

            {/* SVG Connections (Perfectly centered, bottom z-index) */}
            <svg 
               viewBox="0 0 100 100" 
               preserveAspectRatio="none"
               style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
             >
               <defs>
                 <filter id="neonGlow">
                   <feGaussianBlur stdDeviation="0.6" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
               </defs>

               {products.slice(1).map((_, i) => {
                 const isActive = activeApp === i + 1;
                 return (
                   <g key={`connection-${i}`}>
                     {/* Static faint line */}
                     <line x1={centerPos.x} y1={centerPos.y} x2={nodePositions[i].x} y2={nodePositions[i].y} stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} strokeWidth="0.4" strokeDasharray="1 2" />
                     {/* Animated glowing line when active */}
                     {isActive && (
                       <motion.line
                         initial={{ strokeDashoffset: 100, opacity: 0 }}
                         animate={{ strokeDashoffset: 0, opacity: 1 }}
                         transition={{ strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
                         x1={centerPos.x} y1={centerPos.y} x2={nodePositions[i].x} y2={nodePositions[i].y}
                         stroke="#00E5FF"
                         strokeWidth="0.6"
                         strokeDasharray="2 3"
                         filter={isDark ? "url(#neonGlow)" : "none"}
                       />
                     )}
                   </g>
                 )
               })}
            </svg>

            {/* Hub Central (Official Isotipo) */}
            <div 
              onClick={() => setActiveApp(0)}
              style={{
                position: 'absolute',
                left: `${centerPos.x}%`,
                top: `${centerPos.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: isDark ? 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(8, 12, 22, 1) 100%)' : '#ffffff',
                border: activeApp === 0 ? '3px solid #00E5FF' : '2px solid rgba(0, 229, 255, 0.6)',
                boxShadow: activeApp === 0 
                  ? '0 0 120px rgba(0, 112, 243, 0.9), inset 0 0 60px rgba(0, 229, 255, 0.5)' 
                  : (isDark ? '0 0 120px rgba(0, 112, 243, 0.7), inset 0 0 50px rgba(0, 229, 255, 0.3)' : '0 0 50px rgba(0, 112, 243, 0.3)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                zIndex: 10,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
                {/* Spinning dashed ring */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed rgba(0, 229, 255, 0.4)', animation: 'spin 30s linear infinite' }} />
                {/* Official Isotipo */}
                <img src="/levanna-logo-hub.png" alt="Levanna Hub" style={{ width: '160px', height: '160px', objectFit: 'contain', filter: isDark ? 'drop-shadow(0 0 20px rgba(255,255,255,0.4)) brightness(0) invert(1)' : 'none', zIndex: 11 }} />
            </div>

            {/* Nodes */}
            {products.slice(1).map((product, i) => {
               const isActive = activeApp === i + 1;
               
               // Logic for Logos: Dark Mode -> Pure White. Light Mode -> Original colors.
               const logoFilter = isDark 
                 ? (isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) brightness(0) invert(1)' : 'brightness(0) invert(1) opacity(0.6)')
                 : (isActive ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'opacity(0.8)');

               return (
                 <motion.div
                   key={`node-${i}`}
                   style={{
                     position: 'absolute',
                     left: `${nodePositions[i].x}%`,
                     top: `${nodePositions[i].y}%`,
                     transform: 'translate(-50%, -50%)',
                     width: '90px',
                     height: '90px',
                     borderRadius: '50%',
                     background: isActive ? (isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.1)') : nodeBgInactive,
                     backdropFilter: 'blur(10px)',
                     WebkitBackdropFilter: 'blur(10px)',
                     border: `2px solid ${isActive ? '#00E5FF' : nodeBorderInactive}`,
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     cursor: 'pointer',
                     zIndex: 20,
                     // Enhanced Glow Effect for active node
                     boxShadow: isActive ? '0 0 60px rgba(0, 229, 255, 0.8), inset 0 0 30px rgba(0, 229, 255, 0.4)' : (isDark ? '0 10px 25px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.05)'),
                   }}
                   whileHover={{ scale: 1.1, boxShadow: isActive ? '0 0 80px rgba(0, 229, 255, 0.9)' : (isDark ? '0 10px 30px rgba(0, 229, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.1)') }}
                   onTap={() => setActiveApp(i + 1)}
                 >
                    {/* Ring decoration */}
                    {isActive && (
                      <motion.div 
                        style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed rgba(0, 229, 255, 0.5)' }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      />
                    )}

                    {product.image && (
                       <img src={product.image} alt={product.title} style={{ width: '45px', height: '45px', objectFit: 'contain', filter: logoFilter, transition: 'filter 0.3s ease' }} />
                    )}
                 </motion.div>
               )
            })}

            {/* Floating Glassmorphism Card (Dynamically Positioned) */}
            <div style={{
               position: 'absolute',
               ...cardPositionStyle, // Dynamic placement to avoid blocking active node
               width: '420px',
               zIndex: 30,
               perspective: '1000px',
               transition: 'left 0.5s ease, right 0.5s ease' // Smooth transition when jumping sides
            }}>
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeApp}
                   initial={{ opacity: 0, rotateY: activeNodeIsRight ? -15 : 15, y: 50, scale: 0.95 }}
                   animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
                   exit={{ opacity: 0, rotateY: activeNodeIsRight ? 15 : -15, y: -20, scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 180, damping: 22 }}
                   style={{
                     background: cardBg,
                     backdropFilter: 'blur(25px)',
                     WebkitBackdropFilter: 'blur(25px)',
                     border: `1px solid ${cardBorder}`,
                     borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.8)'}`,
                     borderRadius: '24px',
                     padding: '2rem',
                     boxShadow: isDark ? '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0, 112, 243, 0.15)' : '0 20px 40px rgba(0,0,0,0.1)',
                   }}
                 >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                       <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.02)', border: `1px solid ${cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isDark ? 'inset 0 2px 10px rgba(255,255,255,0.05)' : 'none' }}>
                         {products[activeApp].image && <img src={products[activeApp].image} alt="" style={{ width: '28px', height: '28px', filter: isDark ? 'drop-shadow(0 0 5px rgba(255,255,255,0.3)) brightness(200%) grayscale(100%)' : 'none' }} />}
                       </div>
                       <div>
                         <h3 style={{ margin: 0, color: textColor, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.5)' : 'none' }}>{products[activeApp].title}</h3>
                         <span style={{ color: '#00E5FF', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', opacity: 0.9 }}>{products[activeApp].code}</span>
                       </div>
                    </div>
                    
                    {/* Description */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.7rem', color: isDark ? '#9CA3AF' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.8rem', fontWeight: 600 }}>Descripción</div>
                      <p style={{ color: textSubColor, fontSize: '0.95rem', lineHeight: '1.7', margin: 0, textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' }}>{products[activeApp].desc}</p>
                    </div>

                    {/* Status Footer */}
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: isDark ? '#9CA3AF' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem', fontWeight: 600 }}>Estado</div>
                          <div style={{ color: products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                            <span style={{ 
                              display: 'inline-block', 
                              width: '8px', 
                              height: '8px', 
                              background: products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B', 
                              borderRadius: '50%', 
                              boxShadow: `0 0 10px ${products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B'}` 
                            }}></span> {products[activeApp].status}
                          </div>
                        </div>
                        <button 
                          disabled={products[activeApp].status === 'En Desarrollo'}
                          onClick={() => setShowDemoModal(true)}
                          style={{ 
                            background: products[activeApp].status === 'En Desarrollo' ? 'rgba(156, 163, 175, 0.2)' : 'linear-gradient(90deg, var(--accent-blue) 0%, #00E5FF 100%)', 
                            color: products[activeApp].status === 'En Desarrollo' ? '#9CA3AF' : 'white', 
                            border: 'none', 
                            padding: '0.7rem 1.5rem', 
                            borderRadius: '12px', 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            cursor: products[activeApp].status === 'En Desarrollo' ? 'not-allowed' : 'pointer', 
                            boxShadow: products[activeApp].status === 'En Desarrollo' ? 'none' : '0 4px 15px rgba(0, 229, 255, 0.4)', 
                            transition: 'transform 0.2s' 
                          }} 
                          onMouseOver={(e) => { if (products[activeApp].status !== 'En Desarrollo') e.currentTarget.style.transform = 'scale(1.05)' }} 
                          onMouseOut={(e) => { if (products[activeApp].status !== 'En Desarrollo') e.currentTarget.style.transform = 'scale(1)' }}
                        >
                          {products[activeApp].status === 'En Desarrollo' ? 'Próximamente' : 'Ver Demo'}
                        </button>
                     </div>
                 </motion.div>
               </AnimatePresence>
            </div>
         </div>
       ) : (
          /* Mobile Stacked Layout (Minimal adaptions for theme) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.2rem', color: textColor, margin: '0 0 0.5rem 0' }}>
                Ecosistema <span className="text-gradient">Levanna</span>
              </h2>
              <p style={{ color: isDark ? '#9CA3AF' : 'var(--text-secondary)', fontSize: '1rem' }}>Explora nuestras herramientas integradas.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={{
                position: 'relative',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: isDark ? 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(8, 12, 22, 1) 100%)' : '#ffffff',
                border: '2px solid rgba(0, 229, 255, 0.6)',
                boxShadow: isDark ? '0 0 120px rgba(0, 112, 243, 0.7), inset 0 0 50px rgba(0, 229, 255, 0.3)' : '0 0 50px rgba(0, 112, 243, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                zIndex: 10
              }}>
                {/* Spinning dashed ring */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed rgba(0, 229, 255, 0.4)', animation: 'spin 30s linear infinite' }} />
                {/* Official Isotipo */}
                <img src="/levanna-logo-hub.png" alt="Levanna Hub" style={{ width: '160px', height: '160px', objectFit: 'contain', filter: isDark ? 'drop-shadow(0 0 20px rgba(255,255,255,0.4)) brightness(0) invert(1)' : 'none', zIndex: 11 }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 1rem', width: '100%', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {products.map((product, i) => {
                  const isActive = activeApp === i;
                  return (
                    <motion.div
                      key={`mob-node-${i}`}
                      onTap={() => setActiveApp(i)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        minWidth: '70px',
                        height: '70px',
                        borderRadius: '20px',
                        background: isActive ? (isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.1)') : nodeBgInactive,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${isActive ? '#00E5FF' : nodeBorderInactive}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                        cursor: 'pointer',
                        zIndex: 25,
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        boxShadow: isActive ? '0 0 20px rgba(0, 229, 255, 0.3)' : '0 4px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      {product.image && <img src={product.image} alt={product.title} style={{ width: '32px', height: '32px', objectFit: 'contain', filter: isDark ? (isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5)) brightness(0) invert(1)' : 'brightness(0) invert(1) opacity(0.6)') : (isActive ? 'none' : 'opacity(0.8)') }} />}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Card */}
            <div style={{ background: cardBg, backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '1.5rem', border: `1px solid ${cardBorder}` }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                     <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${cardBorder}` }}>
                      {products[activeApp].image && <img src={products[activeApp].image} alt="" style={{ width: '22px', height: '22px', filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', color: textColor, margin: 0, textTransform: 'uppercase' }}>{products[activeApp].title}</h3>
                      <span style={{ color: '#00E5FF', fontSize: '0.7rem' }}>{products[activeApp].code}</span>
                    </div>
                  </div>
                  <p style={{ lineHeight: '1.6', color: textSubColor, fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
                    {products[activeApp].desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: isDark ? '#9CA3AF' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem', fontWeight: 600 }}>Estado</div>
                      <div style={{ color: products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
                        <span style={{ 
                          display: 'inline-block', 
                          width: '6px', 
                          height: '6px', 
                          background: products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B', 
                          borderRadius: '50%', 
                          boxShadow: `0 0 8px ${products[activeApp].status === 'Operativa' ? '#10B981' : '#F59E0B'}` 
                        }}></span> {products[activeApp].status}
                      </div>
                    </div>
                    <button 
                      disabled={products[activeApp].status === 'En Desarrollo'}
                      onClick={() => setShowDemoModal(true)}
                      style={{ 
                        background: products[activeApp].status === 'En Desarrollo' ? 'rgba(156, 163, 175, 0.2)' : 'linear-gradient(90deg, var(--accent-blue) 0%, #00E5FF 100%)', 
                        color: products[activeApp].status === 'En Desarrollo' ? '#9CA3AF' : 'white', 
                        border: 'none', 
                        padding: '0.6rem 1.2rem', 
                        borderRadius: '10px', 
                        fontSize: '0.85rem', 
                        fontWeight: 700, 
                        cursor: products[activeApp].status === 'En Desarrollo' ? 'not-allowed' : 'pointer', 
                        boxShadow: products[activeApp].status === 'En Desarrollo' ? 'none' : '0 4px 12px rgba(0, 229, 255, 0.3)' 
                      }}
                    >
                      {products[activeApp].status === 'En Desarrollo' ? 'Próximamente' : 'Ver Demo'}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Demo Modal */}
        <Modal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {!products[activeApp].demoUrl ? (
              <>
                <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <h2 style={{ color: textColor, marginBottom: '1rem' }}>Demo de {products[activeApp].title}</h2>
                <p style={{ color: textSubColor, marginBottom: '2rem', lineHeight: '1.6' }}>
                  Estamos preparando el material audiovisual para esta aplicación. Muy pronto podrás ver un recorrido detallado de todas sus funcionalidades.
                </p>
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: `1px dashed ${cardBorder}`
                }}>
                  <span style={{ color: isDark ? '#4B5563' : '#9CA3AF', fontWeight: 500 }}>Video en producción...</span>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ color: textColor, marginBottom: '1.5rem' }}>Demo de {products[activeApp].title}</h2>
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)',
                  border: `1px solid ${cardBorder}`
                }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={products[activeApp].demoUrl} 
                    title={`Demo de ${products[activeApp].title}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    style={{ display: 'block' }}
                  ></iframe>
                </div>
              </>
            )}
          </div>
        </Modal>
    </section>
  );
}
