const pillars = [
  { name: 'Administrativo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="12" cy="13" r="3"/><path d="M12 9v1"/><path d="M12 16v1"/><path d="M16 13h-1"/><path d="M9 13H8"/><path d="M14.8 10.2l-.7.7"/><path d="M9.9 15.1l-.7.7"/><path d="M14.8 15.8l-.7-.7"/><path d="M9.9 8.9l-.7-.7"/></svg> },
  { name: 'Técnico', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg> },
  { name: 'Seguridad', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="10" y="10" width="4" height="5" rx="1"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/></svg> },
  { name: 'Efectividad', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-6 6"/><path d="M18 9v6"/><path d="M18 9h-6"/></svg> },
  { name: 'Integración', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
  { name: 'Agilidad', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/><path d="M12 2v2"/></svg> }
];

export default function Hero() {
  return (
    <section className="section container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="animate-slide-up" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <h1 style={{ lineHeight: '1.2' }}>
          El <span className="text-gradient">ecosistema</span> digital que <br />
          transforma tu operación.
        </h1>
        
        <p style={{ marginTop: '1rem', marginBottom: '0', fontSize: '1.3rem', color: '#6B7280', fontWeight: 400, letterSpacing: '0.02em' }}>
          Automatizamos procesos, potenciamos decisiones.
        </p>
        
        <p style={{ margin: '2rem auto 3.5rem', fontSize: '1.35rem', maxWidth: '700px' }}>
          Centraliza el control de tus obras y plantas industriales en una sola plataforma. Desde el acceso del personal hasta la ejecución presupuestal, automatizamos tus procesos con tecnología e IA para proteger tu rentabilidad.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#soluciones-ia" className="btn-primary" style={{ textDecoration: 'none' }}>
            Explorar Soluciones
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <button data-cal-link="camilo-bohorquez-fyu1hl/demo-gratis" className="btn-secondary">Agendar Demo Gratis</button>
        </div>

        {/* End-to-End Pillars Marquee */}
        <div style={{ marginTop: '5rem', position: 'relative', padding: '1.5rem', background: 'var(--panel-bg)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', border: '1px solid var(--panel-border)', overflow: 'hidden' }}>
          
          <h3 style={{ margin: '0.5rem 0 1.5rem 0', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.4rem' }}>
            Flujo de Aplicación <span className="text-gradient">End-to-End</span>
          </h3>

          <div className="ticker-wrap">
            <div className="ticker">
              <div className="ticker-line"></div>
              {[...pillars, ...pillars].map((p, i) => (
                <div className="ticker-item" key={i}>
                  <div className="ticker-icon-wrapper">
                    {p.icon}
                  </div>
                  <span className="ticker-title">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
