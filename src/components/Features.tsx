import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  title: string;
  desc: string;
  image?: string;
  icon?: string;
}

export default function Features() {
  const [activeApp, setActiveApp] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products: Product[] = [
    { 
      title: 'Control de Acceso', 
      desc: 'El fin de la infraestructura costosa y las planillas de papel. Nuestra aplicación nativa transforma la gestión de personal en obra o en oficina sin requerir equipos físicos ni mantenimientos. Gestiona las horas laboradas de tu equipo con precisión y recibe alertas de seguridad automáticas.', 
      image: '/apps/control-acceso.png' 
    },
    { 
      title: 'Caja Menor Nativa', 
      desc: 'Auditoría y control de gastos de campo, ahora en su propia App. Evolucionamos nuestra gestión financiera dejando atrás los reportes por WhatsApp. Con nuestra aplicación tienes el control absoluto: verifica registros, bloquea gastos no autorizados y mantén un historial inmutable.', 
      image: '/apps/caja-menor.png' 
    },
    { 
      title: 'Asistente de Reuniones', 
      desc: 'Tu copiloto inteligente para comités y recorridos de obra. Nuestro asistente transcribe de forma inteligente tus juntas, identificando los puntos clave para delegar tareas automáticamente y rastrear su cumplimiento. Genera resúmenes ejecutivos precisos al instante.', 
      image: '/apps/asistente-reuniones.png' 
    },
    { 
      title: 'Licitaciones 360', 
      desc: 'Análisis automatizado de pliegos. Identificamos riesgos legales, evaluamos viabilidad y extraemos hitos críticos en segundos para que nunca pierdas una oportunidad. Centraliza todo el proceso de participación en un solo entorno colaborativo.', 
      image: '/apps/licitaciones.png' 
    },
    { 
      title: 'Control Presupuestal', 
      desc: 'Sistematización financiera enfocada en obra. Control cruzado entre presupuesto base vs. ejecutado y auditoría ágil de cortes de subcontratistas. Visualiza el estado real de tus finanzas con métricas actualizadas segundo a segundo.', 
      image: '/apps/control-presupuestal.png' 
    },
    { 
      title: 'Bóveda Documental', 
      desc: 'La única fuente de verdad. Unificación de esquemas de trabajo, planos, versiones, registro fotográfico y contratos en la nube con acceso en tiempo real. Adiós a la dispersión de información y los archivos perdidos en cadenas de correo.', 
      image: '/apps/boveda.png' 
    }
  ];

  // Irregular organic positions around the center for desktop
  const nodePositions = [
    { left: '20%', top: '22%' },   // Top Left
    { left: '70%', top: '18%' },   // Top Right
    { left: '12%', top: '60%' },   // Bottom Left
    { left: '35%', top: '85%' },   // Bottom Center-Left
    { left: '60%', top: '82%' },   // Bottom Center-Right
    { left: '85%', top: '48%' },   // Right
  ];
  
  const centerPos = { left: '45%', top: '48%' };

  return (
    <section id="soluciones-ia" style={{ position: 'relative', width: '100%', minHeight: isMobile ? 'auto' : '900px', background: '#080C16', overflow: 'hidden', padding: isMobile ? '4rem 1rem' : '0' }}>
       
       {/* Background Deep Space & Rings */}
       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 45% 48%, rgba(0, 112, 243, 0.12) 0%, rgba(8, 12, 22, 1) 65%)', pointerEvents: 'none' }} />
       
       {/* Giant Orbital Rings */}
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '900px', height: '900px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', borderRadius: '50%', border: '1px solid rgba(0, 112, 243, 0.08)', boxShadow: 'inset 0 0 80px rgba(0,112,243,0.03)', pointerEvents: 'none' }} />
       <div style={{ position: 'absolute', top: '48%', left: '45%', transform: 'translate(-50%, -50%)', width: '450px', height: '450px', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

       {/* Floating Particles */}
       {!isMobile && [...Array(25)].map((_, i) => (
         <motion.div
           key={`particle-${i}`}
           style={{
             position: 'absolute',
             width: Math.random() * 3 + 1 + 'px',
             height: Math.random() * 3 + 1 + 'px',
             background: 'rgba(0, 112, 243, 0.6)',
             borderRadius: '50%',
             left: Math.random() * 100 + '%',
             top: Math.random() * 100 + '%',
             boxShadow: '0 0 10px rgba(0, 112, 243, 0.8)',
             pointerEvents: 'none',
             zIndex: 1
           }}
           animate={{
             y: [0, Math.random() * -60 - 20, 0],
             x: [0, Math.random() * 40 - 20, 0],
             opacity: [0.1, 0.7, 0.1],
           }}
           transition={{
             duration: Math.random() * 5 + 5,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
       ))}

       {/* Interactive Layer */}
       {!isMobile ? (
         <div style={{ position: 'absolute', width: '100%', height: '100%', maxWidth: '1400px', margin: '0 auto', left: 0, right: 0 }}>
            
            {/* Title overlay */}
            <div style={{ position: 'absolute', top: '5%', left: '5%', zIndex: 40 }}>
              <h2 style={{ fontSize: '2.8rem', color: 'white', margin: 0, textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                Ecosistema <span className="text-gradient">Levanna</span>
              </h2>
              <p style={{ color: '#9CA3AF', fontSize: '1.1rem', maxWidth: '400px', marginTop: '0.5rem' }}>
                Selecciona un nodo para explorar la interconexión de nuestras herramientas.
              </p>
            </div>

            {/* SVG Connections */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
               <defs>
                 <filter id="neonGlow">
                   <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
               </defs>

               {products.map((_, i) => {
                 const isActive = activeApp === i;
                 return (
                   <g key={`connection-${i}`}>
                     {/* Static faint line */}
                     <line x1={centerPos.left} y1={centerPos.top} x2={nodePositions[i].left} y2={nodePositions[i].top} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 6" />
                     {/* Animated glowing line when active */}
                     {isActive && (
                       <motion.line
                         initial={{ strokeDashoffset: 100, opacity: 0 }}
                         animate={{ strokeDashoffset: 0, opacity: 1 }}
                         transition={{ strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
                         x1={centerPos.left} y1={centerPos.top} x2={nodePositions[i].left} y2={nodePositions[i].top}
                         stroke="#00E5FF" // A brighter cyan/blue for the HUD feel
                         strokeWidth="2"
                         strokeDasharray="8 12"
                         filter="url(#neonGlow)"
                       />
                     )}
                   </g>
                 )
               })}
            </svg>

            {/* Hub */}
            <div style={{
               position: 'absolute',
               left: centerPos.left,
               top: centerPos.top,
               transform: 'translate(-50%, -50%)',
               width: '160px',
               height: '160px',
               borderRadius: '50%',
               background: 'radial-gradient(circle, rgba(17, 24, 39, 0.9) 0%, rgba(8, 12, 22, 1) 100%)',
               border: '2px solid rgba(0, 229, 255, 0.4)',
               boxShadow: '0 0 80px rgba(0, 112, 243, 0.5), inset 0 0 30px rgba(0, 229, 255, 0.2)',
               display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
               zIndex: 10
            }}>
               <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px dashed rgba(0, 229, 255, 0.3)', animation: 'spin 15s linear infinite' }} />
               <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>

            {/* Nodes */}
            {products.map((product, i) => {
               const isActive = activeApp === i;
               return (
                 <motion.div
                   key={`node-${i}`}
                   style={{
                     position: 'absolute',
                     left: nodePositions[i].left,
                     top: nodePositions[i].top,
                     transform: 'translate(-50%, -50%)',
                     width: '90px',
                     height: '90px',
                     borderRadius: '50%',
                     background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'rgba(17, 24, 39, 0.7)',
                     backdropFilter: 'blur(10px)',
                     WebkitBackdropFilter: 'blur(10px)',
                     border: `2px solid ${isActive ? '#00E5FF' : 'rgba(255,255,255,0.1)'}`,
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     cursor: 'pointer',
                     zIndex: 20,
                     boxShadow: isActive ? '0 0 40px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 229, 255, 0.2)' : '0 10px 25px rgba(0,0,0,0.4)',
                   }}
                   whileHover={{ scale: 1.1, boxShadow: isActive ? '0 0 50px rgba(0, 229, 255, 0.6)' : '0 10px 30px rgba(0, 229, 255, 0.2)' }}
                   onClick={() => setActiveApp(i)}
                 >
                    {/* Ring decoration */}
                    {isActive && (
                      <motion.div 
                        style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', border: '1px dashed rgba(0, 229, 255, 0.4)' }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      />
                    )}

                    {product.image ? (
                       <img src={product.image} alt={product.title} style={{ width: '45px', height: '45px', objectFit: 'contain', filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'opacity(0.7)' }} />
                    ) : (
                       <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                         <path d={product.icon} />
                       </svg>
                    )}
                 </motion.div>
               )
            })}

            {/* Floating Glassmorphism Card */}
            <div style={{
               position: 'absolute',
               bottom: '5%',
               right: '3%',
               width: '420px',
               zIndex: 30,
               perspective: '1000px'
            }}>
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeApp}
                   initial={{ opacity: 0, rotateX: 10, y: 50, scale: 0.95 }}
                   animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                   exit={{ opacity: 0, rotateX: -10, y: -20, scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 180, damping: 22 }}
                   style={{
                     background: 'linear-gradient(145deg, rgba(30, 38, 56, 0.6) 0%, rgba(15, 20, 31, 0.8) 100%)',
                     backdropFilter: 'blur(25px)',
                     WebkitBackdropFilter: 'blur(25px)',
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                     borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                     borderRadius: '24px',
                     padding: '2rem',
                     boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0, 112, 243, 0.15)',
                   }}
                 >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                       <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.05)' }}>
                         {products[activeApp].image && <img src={products[activeApp].image} alt="" style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} />}
                       </div>
                       <div>
                         <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{products[activeApp].title}</h3>
                         <span style={{ color: '#00E5FF', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', opacity: 0.9 }}>SYSTEM ID: 0{activeApp + 1}</span>
                       </div>
                    </div>
                    
                    {/* Description */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.8rem', fontWeight: 600 }}>Descripción</div>
                      <p style={{ color: '#E5E7EB', fontSize: '0.95rem', lineHeight: '1.7', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{products[activeApp].desc}</p>
                    </div>

                    {/* Status Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                       <div>
                         <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem', fontWeight: 600 }}>Estado</div>
                         <div style={{ color: '#10B981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                           <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981' }}></span> Operativo
                         </div>
                       </div>
                       <button style={{ background: 'linear-gradient(90deg, var(--accent-blue) 0%, #00E5FF 100%)', color: '#080C16', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 229, 255, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                         Abrir Módulo
                       </button>
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>
         </div>
       ) : (
          /* Mobile Stacked Layout */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.2rem', color: 'white', margin: '0 0 0.5rem 0' }}>
                Ecosistema <span className="text-gradient">Levanna</span>
              </h2>
              <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>Explora nuestras herramientas integradas.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(17, 24, 39, 0.9) 0%, rgba(8, 12, 22, 1) 100%)',
                border: '2px solid rgba(0, 229, 255, 0.4)',
                boxShadow: '0 0 40px rgba(0, 112, 243, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>

              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 1rem', width: '100%', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {products.map((product, i) => {
                  const isActive = activeApp === i;
                  return (
                    <motion.div
                      key={`mob-node-${i}`}
                      onClick={() => setActiveApp(i)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        minWidth: '70px',
                        height: '70px',
                        borderRadius: '20px',
                        background: isActive ? 'rgba(0, 229, 255, 0.15)' : 'rgba(17, 24, 39, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${isActive ? '#00E5FF' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: isActive ? '0 0 20px rgba(0, 229, 255, 0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
                      }}
                    >
                      {product.image && <img src={product.image} alt={product.title} style={{ width: '32px', height: '32px', objectFit: 'contain', filter: isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' : 'opacity(0.6)' }} />}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Card */}
            <div style={{ background: 'linear-gradient(145deg, rgba(30, 38, 56, 0.7) 0%, rgba(15, 20, 31, 0.9) 100%)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                     <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {products[activeApp].image && <img src={products[activeApp].image} alt="" style={{ width: '22px', height: '22px' }} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', color: 'white', margin: 0, textTransform: 'uppercase' }}>{products[activeApp].title}</h3>
                      <span style={{ color: '#00E5FF', fontSize: '0.7rem' }}>SYSTEM ID: 0{activeApp + 1}</span>
                    </div>
                  </div>
                  <p style={{ lineHeight: '1.6', color: '#E5E7EB', fontSize: '0.9rem', margin: 0 }}>
                    {products[activeApp].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
    </section>
  );
}
