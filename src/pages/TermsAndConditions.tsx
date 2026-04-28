import { useEffect } from 'react';

export default function TermsAndConditions() {
  // Asegurarnos que la página cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Términos y Condiciones de Uso y Contratación de Servicios</h1>

      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          <strong>Última actualización: 28 de abril de 2026</strong>
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. Información General y Aceptación</h3>
        <p style={{ marginBottom: '2rem' }}>
          Los presentes Términos y Condiciones regulan el acceso y uso del sitio web www.levannadc.com, así como la contratación de los servicios ofrecidos por Levanna Digital Control (en adelante, "Levanna DC" o "La Empresa"). Al acceder, navegar o utilizar este sitio web, así como al contratar cualquiera de nuestros servicios físicos o digitales, el usuario (en adelante, "El Cliente" o "El Usuario") acepta expresamente y en su totalidad los presentes términos. Si no está de acuerdo con estos términos, le rogamos que no utilice nuestro sitio web ni nuestros servicios.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. Naturaleza de los Servicios</h3>
        <p style={{ marginBottom: '1rem' }}>
          Levanna DC opera bajo un modelo de negocio híbrido, ofreciendo soluciones integrales para el sector industrial y de la construcción, divididas en dos líneas principales:
        </p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>2.1. Servicios de consultoría en Diseño, Arquitectura y Construcción:</strong> Comprende la consultoría, diseño, planificación, dirección y ejecución de obras civiles e industriales. Las condiciones específicas, plazos, garantías y entregables de estos proyectos se regirán por un Contrato de Obra o Prestación de Servicios independiente y específico para cada proyecto.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>2.2. Soluciones Tecnológicas y Software as a Service (SaaS):</strong> Comprende el licenciamiento y acceso a herramientas digitales de automatización de procesos, tales como sistemas de control de acceso físico, gestión automatizada de flujos financieros y herramientas de análisis de datos y licitaciones asistidas por inteligencia artificial.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. Licencia de Uso de Soluciones Tecnológicas (SaaS)</h3>
        <p style={{ marginBottom: '1rem' }}>
          Para los servicios descritos en la sección 2.2, Levanna DC otorga al Cliente una licencia de uso temporal, no exclusiva, intransferible y revocable para acceder y utilizar el software y sus módulos asociados.
        </p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Restricciones:</strong> Queda estrictamente prohibido al Cliente o a terceros copiar, modificar, distribuir, vender, ceder o realizar ingeniería inversa (reverse engineering) del código fuente, algoritmos, integraciones de bases de datos o interfaces de las soluciones tecnológicas proveídas.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Disponibilidad:</strong> Levanna DC realizará sus mejores esfuerzos para garantizar la alta disponibilidad del software; sin embargo, no garantiza un servicio ininterrumpido debido a posibles mantenimientos programados, actualizaciones de servidores o causas de fuerza mayor.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>4. Estructura de Precios, Facturación y Pagos</h3>
        <p style={{ marginBottom: '1rem' }}>
          Las condiciones comerciales para las soluciones tecnológicas operan bajo un modelo de licenciamiento estandarizado:
        </p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Tarifas Fijas por Módulos y Tramos:</strong> El cobro por los servicios de software (SaaS) se basa en una tabla de precios fija y preestablecida, la cual varía exclusivamente en función del número de módulos activos contratados y el rango o nivel de empleados/usuarios registrados en el sistema.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Exclusión de Fluctuación Cambiaria:</strong> Las tarifas aplicables a los servicios digitales se mantendrán fijas según lo acordado en el momento de la contratación y no estarán sujetas a conversiones dinámicas, ajustes por la Tasa Representativa del Mercado (TRM) del dólar (USD a COP), ni fluctuaciones cambiarias durante el periodo facturado.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Facturación Electrónica:</strong> Levanna DC emitirá la respectiva factura electrónica con los plazos de vencimiento estipulados en la propuesta comercial. El impago tras la fecha de vencimiento facultará a Levanna DC para suspender temporal o definitivamente el acceso a las plataformas digitales.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>5. Propiedad Intelectual</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>De Levanna DC:</strong> Todo el contenido del sitio web www.levannadc.com, la marca comercial, logotipos, la identidad visual, el código fuente, los flujos de automatización, los modelos de inteligencia artificial y las metodologías desarrolladas son propiedad exclusiva e indelegable de Levanna DC y están protegidos por las leyes de propiedad intelectual e industrial aplicables.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Del Cliente:</strong> Toda la información, bases de datos, recibos, documentos de licitación y datos operativos ingresados por el Cliente a las plataformas de Levanna DC siguen siendo de su exclusiva propiedad.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>6. Uso de Inteligencia Artificial (IA) y Limitación de Responsabilidad</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>6.1. Naturaleza de las Herramientas de IA:</strong> Levanna DC integra en su plataforma diversas herramientas basadas en Inteligencia Artificial y automatización. El Cliente reconoce y acepta que estas herramientas actúan como asistencia tecnológica y apoyo a la productividad, y no sustituyen el juicio, análisis o asesoría profesional humana.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>6.2. Margen de Error y "Alucinaciones":</strong> El Cliente comprende que los modelos de Inteligencia Artificial pueden generar resultados inexactos, incompletos o ficticios (fenómeno conocido como "alucinaciones"). Levanna DC no garantiza la exactitud o idoneidad al 100% de la información generada, resumida o extraída por sus agentes de IA.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>6.3. Obligación de Revisión Humana (Human-in-the-loop):</strong> Es responsabilidad exclusiva y obligatoria del Cliente revisar, verificar y validar todo contenido, cálculo, resumen, análisis de pliegos o dato extraído por la IA antes de tomar decisiones comerciales, legales, financieras o de participación en licitaciones basadas en dicha información.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>6.4. Exención de Responsabilidad General:</strong> Levanna DC no asume responsabilidad alguna por pérdidas económicas, lucro cesante o daños derivados del uso indebido de la plataforma o de la confianza ciega en los resultados generados por la IA. La responsabilidad máxima de Levanna DC frente a cualquier reclamación derivada del uso del software no excederá en ningún caso el monto total pagado por el Cliente durante los últimos doce (12) meses por el servicio que dio origen a la reclamación.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>7. Legislación Aplicable y Resolución de Controversias</h3>
        <p style={{ marginBottom: '1rem' }}>Dada la naturaleza transnacional de las operaciones de Levanna DC:</p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Uso General del Sitio Web y Operaciones en Colombia:</strong> La interpretación y cumplimiento de estos Términos y Condiciones, así como cualquier disputa que surja en relación con clientes radicados en Colombia, se regirán por las leyes de la República de Colombia, sometiéndose a la jurisdicción de los jueces y tribunales de la ciudad de Bogotá D.C.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Operaciones en Estados Unidos:</strong> Para aquellos contratos y prestación de servicios celebrados con personas naturales o jurídicas (LLCs o corporaciones) radicadas en los Estados Unidos, las condiciones específicas, legislación aplicable y resolución de controversias se regirán de manera subsidiaria por las leyes del Estado de Florida, sujeto a lo estipulado en el contrato particular de dicho servicio.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>8. Modificaciones a los Términos y Condiciones</h3>
        <p style={{ marginBottom: '2rem' }}>
          Levanna DC se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor de forma inmediata tras su publicación en el sitio web <a href="https://www.levannadc.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>www.levannadc.com</a>. Se notificará a los clientes con servicios activos sobre cambios sustanciales a través de los canales de contacto registrados.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>9. Contacto</h3>
        <p style={{ marginBottom: '1rem' }}>Para cualquier duda, solicitud o notificación legal relacionada con estos Términos y Condiciones, el usuario puede comunicarse a:</p>
        <ul style={{ marginBottom: '4rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Correo electrónico:</strong> info@levannadc.com</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Teléfono:</strong> +57 3103311543 / +1 7727740605</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Dirección física:</strong> Bogotá Calle 159 # 54-78 int 3401 / Miami: 7630NW 25 Street Ste 2B B065418</li>
        </ul>
      </div>
    </div>
  );
}
