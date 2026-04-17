import { useEffect, useState } from 'react';

export default function PrivacyPolicy() {
  const [emailOrId, setEmailOrId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Asegurarnos que la página cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOptOut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId.trim()) return;

    setStatus('loading');
    
    // Placeholder webhook url provisto para luego conectarse con n8n
    const webhookUrl = import.meta.env.VITE_WEBHOOK_BAJA || 'https://tu-webhook-n8n.example.com/baja-datos';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: emailOrId, action: 'derecho_al_olvido', source: 'landing_page_optout' }),
      });
      setStatus('success');
      setEmailOrId('');
    } catch (error) {
      console.error('Error al solicitar baja:', error);
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Política de Privacidad</h1>

      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          <strong>Política de Tratamiento de Datos Personales y Privacidad</strong>
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. Identificación del Responsable del Tratamiento</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Razón Social:</strong> Levanna Digital Control</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Sitio Web:</strong> <a href="https://www.levannadc.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>www.levannadc.com</a></li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Correo Electrónico:</strong> info@levannadc.com</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Teléfono:</strong> +57 3103311543</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Dirección:</strong> Calle 159 # 54-78 T3 A401</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. Marco Legal y Propósito</h3>
        <p style={{ marginBottom: '2rem' }}>
          La presente política se rige por los parámetros establecidos en la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 (Ley de Protección de Datos Personales en Colombia), así como las normativas concordantes aplicables en la región. Levanna Digital Control garantiza la protección de los derechos al Habeas Data, la intimidad y el buen nombre de las personas, estableciendo los términos bajo los cuales se realiza la recolección, almacenamiento, uso, circulación y supresión de los datos personales.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. Datos Personales Recolectados</h3>
        <p style={{ marginBottom: '1rem' }}>A través de nuestro sitio web y canales de atención, podremos recolectar la siguiente información del Titular:</p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}>Nombres y apellidos.</li>
          <li style={{ marginBottom: '0.5rem' }}>Datos de contacto (correo electrónico, número de teléfono, ciudad de residencia).</li>
          <li style={{ marginBottom: '0.5rem' }}>Información específica sobre requerimientos de servicios de diseño, arquitectura y construcción.</li>
        </ul>
        <p style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
          Adicionalmente, mediante nuestras plataformas tecnológicas y aplicaciones web, recolectamos datos de registro y uso, como: marcas de tiempo (timestamps) de entrada y salida, identificadores de lectura QR, y metadatos operativos necesarios para el funcionamiento de nuestras soluciones de software y automatización.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>4. Finalidad del Tratamiento de los Datos</h3>
        <p style={{ marginBottom: '1rem' }}>Los datos personales proporcionados por el Titular serán utilizados con las siguientes finalidades:</p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}>Procesar y responder a solicitudes de información, cotizaciones y consultas sobre nuestros servicios.</li>
          <li style={{ marginBottom: '0.5rem' }}>Mantener un registro de clientes y contactos comerciales para la prestación eficiente del servicio.</li>
          <li style={{ marginBottom: '0.5rem' }}>Enviar comunicaciones comerciales, boletines informativos, actualizaciones de servicios o promociones relevantes de Levanna Digital Control, siempre que el Titular haya otorgado su autorización.</li>
          <li style={{ marginBottom: '0.5rem' }}>Dar cumplimiento a obligaciones legales, contractuales o tributarias.</li>
        </ul>
        <p style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-purple)' }}>
          Proveer, mantener, asegurar y mejorar los servicios de Software como Servicio (SaaS), incluyendo el procesamiento de registros de control en tiempo real, la alimentación de tableros analíticos (dashboards) y la ejecución de notificaciones automatizadas. En estos casos tecnológicos, Levanna actúa como 'Encargado' del tratamiento de la información bajo la instrucción de la empresa cliente ('Responsable').
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>5. Derechos del Titular de los Datos</h3>
        <p style={{ marginBottom: '1rem' }}>De conformidad con la legislación aplicable, los usuarios (Titulares) tienen los siguientes derechos:</p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}>Conocer, actualizar y rectificar sus datos personales frente a Levanna Digital Control.</li>
          <li style={{ marginBottom: '0.5rem' }}>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
          <li style={{ marginBottom: '0.5rem' }}>Ser informado respecto al uso que se le ha dado a sus datos personales.</li>
          <li style={{ marginBottom: '0.5rem' }}>Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
          <li style={{ marginBottom: '0.5rem' }}>Acceder en forma gratuita a sus datos personales que hayan sido objeto de Tratamiento.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>6. Mecanismos para Ejercer los Derechos</h3>
        <p style={{ marginBottom: '2rem' }}>
          Para ejercer sus derechos de conocer, actualizar, rectificar o suprimir información, así como para revocar la autorización, el Titular puede enviar una solicitud formal al correo electrónico: <a href="mailto:info@levannadc.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>info@levannadc.com</a> La solicitud será atendida en un término máximo de quince (15) días hábiles.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>7. Uso de Cookies</h3>
        <p style={{ marginBottom: '2rem' }}>
          El sitio web <a href="https://www.levannadc.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>www.levannadc.com</a> utiliza cookies para mejorar la experiencia del usuario, analizar el tráfico del sitio y personalizar el contenido. El usuario puede configurar su navegador para rechazar las cookies, aunque esto podría afectar la funcionalidad de ciertas áreas del sitio web.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>8. Transferencia y Procesamiento en la Nube</h3>
        <p style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
          Para garantizar la alta disponibilidad y seguridad de nuestros servicios, Levanna utiliza proveedores de infraestructura en la nube y herramientas de automatización. Los datos personales pueden ser procesados y almacenados en servidores externos (incluyendo servicios de bases de datos relacionales y flujos de trabajo automatizados) que cumplen con los estándares internacionales de seguridad y encriptación de la información.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>9. Vigencia</h3>
        <p style={{ marginBottom: '4rem' }}>
          Esta política de privacidad es efectiva a partir de 28 de Octubre de 2025 y las bases de datos tendrán una vigencia igual al tiempo en que se mantenga y utilice la información para las finalidades descritas.
        </p>

        {/* Formulario Derecho al Olvido */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', marginBottom: '3rem' }} />
        
        <div style={{ background: 'var(--panel-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--panel-border)', boxShadow: 'var(--shadow-soft)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Gestión de mis Datos Personales</h2>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Si deseas ejercer tu derecho a la supresión de datos ("Derecho al Olvido"), ingresa tu correo electrónico corporativo o ID de usuario. Tus datos personales serán anonimizados de nuestros sistemas de acuerdo con la ley vigente.
          </p>

          <form onSubmit={handleOptOut} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="identifier" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Correo electrónico o ID de Usuario</label>
              <input 
                id="identifier"
                type="text" 
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                placeholder="ejemplo@empresa.com"
                required
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--panel-border)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'loading'}
              style={{
                marginTop: '0.5rem',
                alignSelf: 'flex-start',
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                opacity: status === 'loading' ? 0.7 : 1
              }}
            >
              {status === 'loading' ? 'Procesando...' : 'Solicitar Baja'}
            </button>
            
            {status === 'success' && (
              <p style={{ color: '#4ade80', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                Tu solicitud ha sido enviada con éxito.
              </p>
            )}
            
            {status === 'error' && (
              <p style={{ color: '#f87171', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Hubo un error al procesar tu solicitud. Asegúrate de tener conexión o intenta más tarde.
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
