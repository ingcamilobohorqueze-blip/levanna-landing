export default function Features() {
  const products = [
    { title: 'Control de Acceso Inteligente', desc: 'Gestión multi-tenant y en tiempo real para la validación de personal, contratistas y maquinaria. Seguridad avanzada y trazabilidad total en el frente de obra.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { title: 'Caja Menor con WhatsApp + IA', desc: 'Olvídate del registro manual. Tus residentes envían fotos de facturas por WhatsApp y nuestra IA extrae los datos, consolidando gastos logísticos al instante.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { title: 'Asistente de Reuniones', desc: 'De la voz a la acción. Transcripción inteligente de juntas y recorridos de campo para delegar tareas automáticamente y rastrear cumplimientos.', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { title: 'Licitaciones 360 (próximamente)', desc: 'Análisis automatizado de pliegos. Identificamos riesgos legales, evaluamos viabilidad y extraemos hitos críticos en segundos para que nunca pierdas una oportunidad.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { title: 'Control Presupuestal y Cortes', desc: 'Sistematización financiera enfocada en obra. Control cruzado entre presupuesto base vs. ejecutado y auditoría ágil de cortes de subcontratistas.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { title: 'Bóveda Documental', desc: 'La única fuente de verdad. Unificación de esquemas de trabajo, planos, versiones, registro fotográfico y contratos en la nube con acceso en tiempo real.', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' }
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
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 8px 16px rgba(37,99,235,0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={product.icon} />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>{product.title}</h3>
              <p style={{ marginTop: '0.8rem' }}>{product.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
