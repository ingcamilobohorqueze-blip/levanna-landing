import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getCalApi } from "@calcom/embed-react";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {"styles":{"branding":{"brandColor":"#1A2233"}}});
    })();
  }, []);
  return (
    <>
      {/* Background Animated Logo */}
      <div className="bg-logo-wrapper">
        <img src="/logo-dark.png" alt="" className="bg-dynamic-logo logo-dark" />
        <img src="/logo-light.png" alt="" className="bg-dynamic-logo logo-light" />
      </div>

      <Header />
      <div className="bg-grid"></div>
      <div className="bg-glow bg-glow-top"></div>
      <div className="bg-glow bg-glow-purple bg-glow-right"></div>
      
      {/* Añadimos padding-top para compensar el Header fixed */}
      <div style={{ paddingTop: '5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos" element={<TermsAndConditions />} />
        </Routes>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
