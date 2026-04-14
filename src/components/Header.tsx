import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Esperamos a que la página Home cargue para saltar a la sección
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      // Ya estamos en Home, simplemente saltamos
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${hash}`);
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '1rem 0', background: 'var(--panel-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--panel-border)', zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Dynamic Logo based on system preference */}
        <Link to="/" onClick={handleHomeClick} style={{ display: 'flex', alignItems: 'center', zIndex: 101 }}>
          <img src="/logo-dark.png" alt="Levanna DC" className="logo-dark" style={{ height: '68px', width: 'auto', objectFit: 'contain' }} />
          <img src="/logo-light.png" alt="Levanna DC" className="logo-light" style={{ height: '68px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {location.pathname !== '/' && (
            <Link to="/" onClick={handleHomeClick} className="nav-link">
              Inicio
            </Link>
          )}
          <a href="#soluciones-ia" onClick={(e) => handleNavClick(e, 'soluciones-ia')} className="nav-link">Soluciones IA</a>
          <a href="#consultoria" onClick={(e) => handleNavClick(e, 'consultoria')} className="nav-link">Consultoría</a>
          <a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')} className="nav-link">Contáctanos</a>

          {/* Botón de acceso clonado para menú móvil (visible solo en mobile) */}
          <div style={{ width: '100%', marginTop: '1rem' }} className="mobile-menu-btn">
            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
              Acceso Clientes
            </button>
          </div>
        </nav>
        
        {/* Link to access control dashboard - Desktop */}
        <div className="desktop-access-btn" style={{ zIndex: 101 }}>
          <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem', gap: '0.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            Acceso Clientes
          </button>
        </div>

        {/* Hamburger Menu Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ zIndex: 101 }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

      </div>
    </header>
  );
}
