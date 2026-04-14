import { useEffect, useState } from 'react';
import Modal from './Modal';

export default function Consulting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load Tally embed script for dynamic height
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Force Tally to re-parse the DOM for widgets once the modal is injected
    if (isModalOpen && typeof window !== 'undefined' && (window as any).Tally) {
      setTimeout(() => {
        (window as any).Tally.loadEmbeds();
      }, 50); // slight delay to ensure DOM is ready
    }
  }, [isModalOpen]);
  return (
    <section id="consultoria" className="section container" style={{ position: 'relative', marginTop: '4rem', marginBottom: '4rem' }}>
      <div className="card-panel animate-slide-up" style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid var(--accent-blue)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          ¿Los procesos manuales están devorando la <span className="text-gradient">utilidad</span> de tu compañia?
        </h2>
        <p style={{ margin: '0 auto 2.5rem auto', maxWidth: '800px', fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          En el sector de la industria y la construcción, cada minuto de desorden es dinero perdido. Si tu control depende de planillas físicas o búsquedas interminables de planos, tu margen está en riesgo. En Levanna digitalizamos tu operación para que retomes el control total de tus proyectos en un ecosistema eficiente.
        </p>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
        >
          Iniciar Diagnóstico
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <iframe data-tally-src="https://tally.so/embed/ob7111?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="600" frameBorder={0} marginHeight={0} marginWidth={0} title="Diagnóstico Técnico" style={{ border: 'none', display: 'block' }}></iframe>
        </Modal>
      </div>
    </section>
  );
}
