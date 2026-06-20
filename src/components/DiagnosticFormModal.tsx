import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';

type DiagnosticFormData = {
  nombre: string;
  correo: string;
  telefono: string;
  empresa?: string;
  cuello_botella: string;
  herramientas: string;
  tiempo_perdido: string;
  vision_exito: string;
  terminos_aceptados: boolean;
};

interface DiagnosticFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticFormModal({ isOpen, onClose }: DiagnosticFormModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DiagnosticFormData>({
    defaultValues: {
      nombre: '',
      correo: '',
      telefono: '',
      empresa: '',
      cuello_botella: '',
      herramientas: '',
      tiempo_perdido: '',
      vision_exito: '',
      terminos_aceptados: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: DiagnosticFormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_DIAGNOSTIC_WEBHOOK || '';
      
      if (!webhookUrl) {
        console.warn('VITE_N8N_DIAGNOSTIC_WEBHOOK no está configurado. Simulando envío...');
      }

      // Si tenemos URL de webhook, enviamos. Si no, simulamos (útil para pruebas locales antes de que el admin la ponga)
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre: data.nombre,
            correo: data.correo,
            telefono: data.telefono || "",
            empresa: data.empresa || "",
            cuello_botella: data.cuello_botella,
            herramientas: data.herramientas,
            tiempo_perdido: data.tiempo_perdido,
            vision_exito: data.vision_exito
          })
        });

        if (!response.ok) {
          throw new Error('Error en el servidor');
        }
      } else {
        // Simular retardo si no hay webhook configurado
        await new Promise(r => setTimeout(r, 1500));
      }

      setSuccess(true);
      reset();
      
    } catch (error) {
      setErrorMsg('Hubo un error al enviar tu diagnóstico. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { if (!isSubmitting) onClose(); }}>
      <div style={{ color: 'var(--text-primary)', maxHeight: '85vh', overflowY: 'auto', paddingRight: '10px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Diagnóstico Consultivo</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Ayúdanos a entender tu operación para diseñar la mejor <strong style={{ color: 'var(--accent-blue)' }}>solución tecnológica</strong>.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ 
              width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 1.5rem auto' 
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>¡Tu diagnóstico está siendo generado!</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Nuestra IA está analizando tus respuestas y creando un documento detallado. Recibirás un correo muy pronto y nuestro equipo te contactará.</p>
            <button 
              onClick={onClose}
              className="btn-primary"
              style={{ marginTop: '2rem', padding: '0.8rem 2rem' }}
            >
              Entendido
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {errorMsg && (
              <div style={{ padding: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Nombre Completo *</label>
                <input 
                  type="text" 
                  placeholder="Ej. Juan Pérez" 
                  {...register('nombre', { required: 'Requerido' })}
                  className="form-input"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
                {errors.nombre && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.nombre.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Correo Electrónico *</label>
                <input 
                  type="email" 
                  placeholder="tu@empresa.com" 
                  {...register('correo', { required: 'Requerido' })}
                  className="form-input"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
                {errors.correo && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.correo.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Teléfono / WhatsApp *</label>
                <input 
                  type="tel" 
                  placeholder="ej. +573102345678" 
                  {...register('telefono', { 
                    required: 'Requerido',
                    pattern: {
                      value: /^\+[0-9]{1,4}[0-9]{10}$/,
                      message: 'Formato: Código país + 10 dígitos (ej. +573102345678)'
                    }
                  })}
                  className="form-input"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
                {errors.telefono && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.telefono.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Empresa (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="Nombre de tu empresa" 
                  {...register('empresa')}
                  className="form-input"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', margin: '0.5rem 0' }} />

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>¿Cuál es tu cuello de botella principal? *</label>
              <textarea 
                placeholder="Describe el proceso o problema que más te frena actualmente..." 
                rows={2}
                {...register('cuello_botella', { required: 'Requerido' })}
                className="form-textarea"
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
              {errors.cuello_botella && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.cuello_botella.message}</span>}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>¿Qué herramientas usas actualmente? *</label>
              <input 
                type="text" 
                placeholder="Ej. Excel, WhatsApp, Trello, papel..." 
                {...register('herramientas', { required: 'Requerido' })}
                className="form-input"
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
              {errors.herramientas && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.herramientas.message}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>¿Cuánto tiempo estimas que pierdes a la semana? *</label>
                <select 
                  {...register('tiempo_perdido', { required: 'Requerido' })}
                  className="form-select"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Menos de 5 horas">Menos de 5 horas</option>
                  <option value="Entre 5 y 10 horas">Entre 5 y 10 horas</option>
                  <option value="Entre 10 y 20 horas">Entre 10 y 20 horas</option>
                  <option value="Más de 20 horas">Más de 20 horas</option>
                </select>
                {errors.tiempo_perdido && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.tiempo_perdido.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>¿Cuál es tu visión de éxito? *</label>
                <input 
                  type="text" 
                  placeholder="Ej. Reducir costos, mayor control, automatizar X..." 
                  {...register('vision_exito', { required: 'Requerido' })}
                  className="form-input"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
                {errors.vision_exito && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.vision_exito.message}</span>}
              </div>
            </div>

            <div>
              <label className={`checkbox-container ${errors.terminos_aceptados ? 'checkbox-error' : ''}`}>
                <input 
                  type="checkbox" 
                  {...register('terminos_aceptados', { required: 'Debes aceptar las políticas para continuar' })} 
                />
                <span className="custom-checkbox"></span>
                <span style={{ fontSize: '0.9rem' }}>
                  Acepto la Política de Tratamiento de Datos.
                </span>
              </label>
              {errors.terminos_aceptados && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.terminos_aceptados.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={onClose}
                className="btn-secondary"
                style={{ flex: 1, padding: '0.875rem' }}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                style={{ flex: 2, padding: '0.875rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando y analizando...' : 'Enviar Diagnóstico'}
                {!isSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
