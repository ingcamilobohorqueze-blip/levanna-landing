import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';
import Modal from './Modal';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const hideContactForm = location.pathname === '/privacidad' || location.pathname === '/terminos';

  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--panel-border)', paddingTop: '5rem', paddingBottom: '2rem', marginTop: '4rem' }}>
      <div id="contacto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!hideContactForm && (
          <div className="container" style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>¿Listo para transformar tu operación?</h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>Déjanos tus datos o cuéntanos el alcance de tu proyecto y un experto de nuestro equipo se pondrá en contacto contigo.</p>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="btn-primary" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.15rem' }}
            >
              Escríbenos
            </button>
            <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)}>
              <ContactForm />
            </Modal>
          </div>
        )}
      </div>
      <div className="container grid-3" style={{ marginBottom: '4rem', gap: '4rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img src="/logo-dark.png" alt="Levanna DC" className="logo-dark" style={{ height: '45px', objectFit: 'contain' }} />
            <img src="/logo-light.png" alt="Levanna DC" className="logo-light" style={{ height: '45px', objectFit: 'contain' }} />
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Aceleramos el futuro de la construcción integrando Inteligencia Artificial en tus flujos de trabajo.</p>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Sede Administrativa USA</h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Miami, FL</strong><br/>
            7630NW 25 Street Ste 2B B065418<br/>
            <a href="tel:+17727740605" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600, marginTop: '0.5rem', display: 'inline-block' }}>+1 772 774 0605</a>
          </p>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Oficina LATAM</h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Bogotá, Colombia</strong><br/>
            Calle 159 # 54-78<br/>
            <a href="tel:+573103311543" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600, marginTop: '0.5rem', display: 'inline-block' }}>+57 310 331 1543</a>
          </p>
        </div>
      </div>
      
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--panel-border)', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} Levanna DC. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/privacidad" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px', fontSize: '0.95rem', fontWeight: 600 }}>Políticas de Privacidad</Link>
          <Link to="/terminos" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px', fontSize: '0.95rem', fontWeight: 600 }}>Términos de Servicio</Link>
        </div>
      </div>
    </footer>
  );
}
