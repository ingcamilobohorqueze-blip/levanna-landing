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
      setIsMobile(window.innerWidth < 1024); // Use 1024 to switch to mobile layout sooner for this complex component
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products: Product[] = [
    { 
      title: 'Control de Acceso Inteligente', 
      desc: 'El fin de la infraestructura costosa y las planillas de papel. Nuestra aplicación nativa transforma la gestión de personal en obra o en oficina sin requerir equipos físicos ni mantenimientos. Un sistema de acceso 100% sin contacto que te brinda información en pantalla en tiempo real. Gestiona las horas laboradas de tu equipo con precisión y recibe alertas de seguridad automáticas (como el vencimiento de planillas de seguridad social o ARL) antes de que se conviertan en un riesgo.', 
      image: '/apps/control-acceso.png' 
    },
    { 
      title: 'Caja Menor App Nativa', 
      desc: 'Auditoría y control de gastos de campo, ahora en su propia App. Evolucionamos nuestra gestión financiera dejando atrás los reportes por WhatsApp. Con nuestra nueva aplicación nativa, tienes el control absoluto de tu flujo de caja: verifica y modifica registros al instante, bloquea gastos no autorizados y mantén un historial inmutable. Además, tu equipo puede gestionar y solicitar reembolsos directamente desde la app. Transparencia, orden y agilidad en cada peso invertido.', 
      image: '/apps/caja-menor.png' 
    },
    { 
      title: 'Asistente de Reuniones', 
      desc: 'Tu copiloto inteligente para comités y recorridos de obra. Olvídate de las actas manuales y los compromisos en el aire. Nuestro asistente transcribe de forma inteligente tus juntas y recorridos de campo, identificando los puntos clave para delegar tareas automáticamente y rastrear su cumplimiento. Genera resúmenes ejecutivos precisos y archiva toda la documentación en un solo entorno centralizado.', 
      image: '/apps/asistente-reuniones.png' 
    },
    { 
      title: 'Licitaciones 360 (próximamente)', 
      desc: 'Análisis automatizado de pliegos. Identificamos riesgos legales, evaluamos viabilidad y extraemos hitos críticos en segundos para que nunca pierdas una oportunidad.', 
      image: '/apps/licitaciones.png' 
    },
    { 
      title: 'Control Presupuestal y Cortes', 
      desc: 'Sistematización financiera enfocada en obra. Control cruzado entre presupuesto base vs. ejecutado y auditoría ágil de cortes de subcontratistas.', 
      image: '/apps/control-presupuestal.png' 
    },
    { 
      title: 'Bóveda Documental', 
      desc: 'La única fuente de verdad. Unificación de esquemas de trabajo, planos, versiones, registro fotográfico y contratos en la nube con acceso en tiempo real.', 
      image: '/apps/boveda.png' 
    }
  ];

  const radius = 220;
  const centerSize = 110;

  return (
    <section id="soluciones-ia" className="section container" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="animate-slide-up">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ecosistema <span className="text-gradient">Levanna Hub</span></h2>
          <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Descubre cómo nuestras aplicaciones se interconectan para centralizar el control de tu operación. Haz clic en cada nodo para explorar.
          </p>
        </div>
        
        {!isMobile ? (
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            {/* Orbital Area */}
            <div style={{ position: 'relative', width: '560px', height: '560px', flexShrink: 0 }}>
              
              {/* SVG Connections Layer */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {products.map((_, i) => {
                  const angle = (i * (2 * Math.PI)) / products.length - Math.PI / 2;
                  const x2 = 280 + Math.cos(angle) * radius;
                  const y2 = 280 + Math.sin(angle) * radius;
                  const isActive = activeApp === i;
                  
                  return (
                    <g key={`line-${i}`}>
                      <line x1="280" y1="280" x2={x2} y2={y2} stroke="rgba(107, 114, 128, 0.2)" strokeWidth="2" strokeDasharray="4 6" />
                      {isActive && (
                        <motion.line
                          initial={{ strokeDashoffset: 0, opacity: 0 }}
                          animate={{ strokeDashoffset: -40, opacity: 1 }}
                          transition={{ strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
                          x1="280" y1="280" x2={x2} y2={y2}
                          stroke="var(--accent-blue)"
                          strokeWidth="3"
                          strokeDasharray="4 6"
                          style={{ filter: 'drop-shadow(0 0 6px var(--accent-blue))' }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central Hub */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${centerSize}px`,
                height: `${centerSize}px`,
                borderRadius: '50%',
                background: 'rgba(26, 34, 51, 0.9)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: 10,
                boxShadow: '0 0 40px rgba(0, 112, 243, 0.3), inset 0 0 20px rgba(0, 112, 243, 0.2)'
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span style={{ color: 'white', fontWeight: 600, marginTop: '0.4rem', fontSize: '0.85rem' }}>Tenant Hub</span>
              </div>

              {/* Orbiting Nodes */}
              {products.map((product, i) => {
                const angle = (i * (2 * Math.PI)) / products.length - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = activeApp === i;

                return (
                  <motion.div
                    key={`node-${i}`}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px - 35px)`,
                      top: `calc(50% + ${y}px - 35px)`,
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: isActive ? 'rgba(26, 34, 51, 0.8)' : 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: `2px solid ${isActive ? 'var(--accent-blue)' : 'rgba(107, 114, 128, 0.4)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 20,
                      boxShadow: isActive ? '0 0 25px rgba(26, 34, 51, 0.8), inset 0 0 10px rgba(0, 112, 243, 0.3)' : '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ scale: 1.15, boxShadow: isActive ? '0 0 30px rgba(26, 34, 51, 0.9), inset 0 0 12px rgba(0, 112, 243, 0.4)' : '0 8px 25px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveApp(i)}
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.title} style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'var(--accent-blue)' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={product.icon} />
                      </svg>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Reading Panel (Text Area) */}
            <div style={{ flex: 1, minWidth: '380px', maxWidth: '500px', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '24px', padding: '3rem 2.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#1A2233', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-blue)', flexShrink: 0, boxShadow: '0 4px 12px rgba(0, 112, 243, 0.15)' }}>
                      {products[activeApp].image ? (
                        <img src={products[activeApp].image} alt={products[activeApp].title} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={products[activeApp].icon} />
                        </svg>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{products[activeApp].title}</h3>
                  </div>
                  <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '1.15rem', margin: 0 }}>
                    {products[activeApp].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Mobile Stacked Layout */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Hub and Nodes Container */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'rgba(26, 34, 51, 0.9)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: '0 0 30px rgba(0, 112, 243, 0.3), inset 0 0 15px rgba(0, 112, 243, 0.2)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span style={{ color: 'white', fontWeight: 600, marginTop: '0.2rem', fontSize: '0.75rem' }}>Hub</span>
              </div>

              {/* Horizontal Scroll Nodes */}
              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 1rem', width: '100%', scrollbarWidth: 'none', justifyContent: 'flex-start', WebkitOverflowScrolling: 'touch' }}>
                {products.map((product, i) => {
                  const isActive = activeApp === i;
                  return (
                    <motion.div
                      key={`mob-node-${i}`}
                      onClick={() => setActiveApp(i)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        minWidth: '65px',
                        height: '65px',
                        borderRadius: '20px',
                        background: isActive ? 'rgba(26, 34, 51, 0.8)' : 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: `2px solid ${isActive ? 'var(--accent-blue)' : 'rgba(107, 114, 128, 0.4)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s',
                        boxShadow: isActive ? '0 0 20px rgba(26, 34, 51, 0.8), inset 0 0 8px rgba(0, 112, 243, 0.3)' : '0 4px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      {product.image ? (
                        <img src={product.image} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'var(--accent-blue)' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={product.icon} />
                        </svg>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Reading Panel Mobile */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '24px', padding: '2rem 1.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', minHeight: '300px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1A2233', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-blue)', flexShrink: 0 }}>
                      {products[activeApp].image && <img src={products[activeApp].image} alt={products[activeApp].title} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>{products[activeApp].title}</h3>
                  </div>
                  <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
                    {products[activeApp].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
