import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';

type FormData = {
  nombre: string;
  empresa: string;
  correo: string;
  presupuesto: string;
  mensaje: string;
  terms_accepted: boolean;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      empresa: '',
      correo: '',
      presupuesto: '',
      mensaje: '',
      terms_accepted: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!data.terms_accepted) {
      setErrorMsg('Debes aceptar la Política de Tratamiento de Datos para continuar.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch('https://cbohorquez1983.app.n8n.cloud/form-test/f7576e09-5bfc-4661-8f7a-49c4a2b0afd9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      reset();
    } catch (error) {
      setErrorMsg('Hubo un error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contacto" style={{ background: 'var(--panel-bg)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--panel-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>Escríbenos</h3>
      
      {success && (
        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          Mensaje enviado. Nuestro equipo se pondrá en contacto pronto.
        </div>
      )}
      
      {errorMsg && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <input 
            type="text" 
            placeholder="Nombre" 
            {...register('nombre', { required: true })}
            className="form-input"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
          />
          {errors.nombre && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Requerido</span>}
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Empresa" 
            {...register('empresa', { required: true })}
            className="form-input"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
          />
          {errors.empresa && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Requerido</span>}
        </div>

        <div>
          <input 
            type="email" 
            placeholder="Correo" 
            {...register('correo', { required: true })}
            className="form-input"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
          />
          {errors.correo && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Requerido</span>}
        </div>

        <div>
          <select 
            {...register('presupuesto')}
            className="form-select"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
          >
            <option value="">Selecciona un presupuesto estimado</option>
            <option value="Menor a 300.000">Menor a 300.000</option>
            <option value="De 300.000 a 600.000">De 300.000 a 600.000</option>
            <option value="Mas de 600.000">Más de 600.000</option>
          </select>
        </div>

        <div>
          <textarea 
            placeholder="Mensaje" 
            rows={4}
            {...register('mensaje', { required: true })}
            className="form-textarea"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
          ></textarea>
          {errors.mensaje && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Requerido</span>}
        </div>

        <div>
          <label className={`checkbox-container ${errors.terms_accepted ? 'checkbox-error' : ''}`}>
            <input 
              type="checkbox" 
              {...register('terms_accepted', { required: true })} 
            />
            <span className="custom-checkbox"></span>
            <span>
              He leído y acepto la{' '}
              <span 
                style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPolicyOpen(true);
                }}
              >
                Política de Tratamiento de Datos
              </span>
            </span>
          </label>
          {errors.terms_accepted && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Debes aceptar la política de tratamiento de datos para continuar.</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-primary"
          style={{ padding: '0.875rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.415, 31.415" strokeLinecap="round" opacity="0.2"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
            </svg>
          ) : (
            <>
              Enviar Mensaje
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </>
          )}
        </button>
      </form>

      {/* Modal de Política de Tratamiento de Datos integrado */}
      <Modal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)}>
        <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-main)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              background: 'rgba(26, 34, 51, 0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--accent-blue)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Política de Tratamiento de Datos</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <p>
              <strong>Levanna Digital Control</strong>, identificada bajo el sitio web <a href="https://www.levannadc.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>www.levannadc.com</a>, garantiza la protección de los derechos al Habeas Data, la intimidad y el buen nombre en cumplimiento con la <strong>Ley Estatutaria 1581 de 2012</strong> (Colombia) y normativas internacionales de protección de datos.
            </p>
            
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>1. Finalidad de la Recolección:</strong>
              <p>Los datos que suministras en este formulario serán tratados exclusivamente con las siguientes finalidades:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', listStyleType: 'disc' }}>
                <li>Responder y gestionar eficientemente tus consultas, cotizaciones o requerimientos de proyectos.</li>
                <li>Establecer contacto comercial y técnico para optimizar y acelerar tus flujos de trabajo operativos.</li>
                <li>Garantizar el soporte adecuado de nuestras soluciones tecnológicas.</li>
              </ul>
            </div>
            
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>2. Derechos del Titular:</strong>
              <p>Tienes el derecho constitucional a conocer, actualizar, rectificar y suprimir tu información en cualquier momento, así como a revocar la autorización otorgada para su tratamiento.</p>
            </div>
            
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>3. Canales de Atención:</strong>
              <p>Para el ejercicio de tus derechos, puedes radicar tu solicitud directamente a través del correo electrónico: <a href="mailto:info@levannadc.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>info@levannadc.com</a>, la cual será atendida en los plazos legales vigentes.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--panel-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
            <button 
              type="button" 
              onClick={() => setIsPolicyOpen(false)}
              className="btn-primary" 
              style={{ padding: '0.7rem 2rem', fontSize: '0.95rem' }}
            >
              Entendido
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
