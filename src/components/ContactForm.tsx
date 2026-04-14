import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  nombre: string;
  empresa: string;
  correo: string;
  presupuesto: string;
  mensaje: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: FormData) => {
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
    </div>
  );
}
