export default function About() {
  return (
    <section className="section container">
      <div className="card-panel animate-slide-up" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--panel-border)' }}>
        
        {/* Top Decorative Banner */}
        <div style={{ height: '8px', background: 'var(--accent-gradient)', width: '100%' }}></div>
        
        <div className="grid-2 about-content">
          <div>
            <div className="badge" style={{ marginBottom: '1.5rem', border: '1px solid var(--panel-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Quiénes Somos</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Tecnología que impulsa <br/><span className="text-gradient">la industria y la construcción.</span></h2>
            <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
              Somos un equipo de ingenieros, estrategas y diseñadores dedicados a eliminar la fricción operativa. No solo entregamos software; diseñamos puentes digitales que permiten a las empresas, fábricas y constructoras enfocarse en lo que mejor saben hacer.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--panel-border)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Nuestra Misión</h4>
                <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>Simplificar la tecnología para que tu empresa se enfoque en su núcleo.</p>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--panel-border)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Nuestra Visión</h4>
                <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>Ser referentes en transformación digital para construcción en LATAM.</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Pilares Estratégicos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { title: 'Automatización End-to-End', desc: 'Optimizamos desde la licitación hasta la entrega final.' },
                { title: 'Consultoría en IA', desc: 'Diagnosticamos y modernizamos tus flujos de trabajo de inmediato.' },
                { title: 'Formación Corporativa', desc: 'Empoderamos a tu talento humano para dominar las herramientas del futuro.' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '16px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--panel-border)', transition: 'transform 0.2s', cursor: 'default' }} className="hover-lift">
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{i + 1}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ fontSize: '1rem', margin: 0, color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
