export default function Features() {
  const products = [
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
      image: '/apps/facturacion.png' 
    },
    { 
      title: 'Bóveda Documental', 
      desc: 'La única fuente de verdad. Unificación de esquemas de trabajo, planos, versiones, registro fotográfico y contratos en la nube con acceso en tiempo real.', 
      image: '/apps/boveda.png' 
    }
  ];

  return (
    <section id="soluciones-ia" className="section container" style={{ position: 'relative' }}>
      <div className="animate-slide-up">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Herramientas que Multiplican tu <span className="text-gradient">Rentabilidad</span></h2>
          <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '1.2rem' }}>Equipa a tu talento con IA. Atiende más clientes con el mismo equipo y elimina el tiempo perdido en tareas manuales.</p>
        </div>
        
        <div className="grid-2">
          {products.map((product, idx) => (
            <div key={idx} className={`card-panel delay-${(idx % 3) + 1}`}>
              <div className="product-icon-wrapper">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="product-icon-img"
                  />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                    <path d={product.icon} />
                  </svg>
                )}
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{product.title}</h3>
              <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>{product.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

