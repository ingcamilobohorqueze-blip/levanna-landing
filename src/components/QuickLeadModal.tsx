import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { supabase } from '../lib/supabase';

type QuickLeadFormData = {
  nombre: string;
  correo: string;
  telefono: string;
  terminos_aceptados: boolean;
};

interface QuickLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function QuickLeadModal({ isOpen, onClose, productName }: QuickLeadModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuickLeadFormData>({
    defaultValues: {
      nombre: '',
      correo: '',
      telefono: '',
      terminos_aceptados: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: QuickLeadFormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase.rpc('upsert_lead', {
        p_nombre: data.nombre,
        p_telefono: data.telefono,
        p_correo: data.correo,
        p_empresa: "", // Oculto en el formulario para no dar fricción
        p_origen: "Web_Urgente", // Catalogado automáticamente como HOT en el CRM
        p_dolor: "Producto de interés: " + productName, // Cambia según el botón
        p_terminos_aceptados: data.terminos_aceptados
      });

      if (supabaseError) {
        console.error('Error inyectando el lead:', supabaseError);
        throw new Error('Supabase error');
      }

      setSuccess(true);
      reset();
      
      // Close after 3 seconds on success
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      setErrorMsg('Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ color: 'var(--text-primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Conectar con Especialista</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Estás a un paso de acelerar tu operación con: <strong style={{ color: 'var(--accent-blue)' }}>{productName}</strong>
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 1.5rem auto' 
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>¡Solicitud Recibida!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Nuestro equipo te contactará de inmediato por WhatsApp.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {errorMsg && (
              <div style={{ padding: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {errorMsg}
              </div>
            )}

            <div>
              <input 
                type="text" 
                placeholder="Nombre Completo" 
                {...register('nombre', { required: 'Requerido' })}
                className="form-input"
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
              {errors.nombre && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.nombre.message}</span>}
            </div>

            <div>
              <input 
                type="email" 
                placeholder="Correo Electrónico" 
                {...register('correo', { required: 'Requerido' })}
                className="form-input"
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
              {errors.correo && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.correo.message}</span>}
            </div>

            <div>
              <input 
                type="tel" 
                placeholder="WhatsApp (ej. +573102345678)" 
                {...register('telefono', { 
                  required: 'Requerido',
                  pattern: {
                    value: /^\+[0-9]{1,4}[0-9]{10}$/,
                    message: 'Debe incluir código de país (ej. +57) y 10 dígitos'
                  }
                })}
                className="form-input"
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
              {errors.telefono && <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.telefono.message}</span>}
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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
                {isSubmitting ? 'Enviando...' : 'Solicitar Ahora'}
                {!isSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
