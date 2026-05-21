import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(8, 12, 22, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              background: 'var(--bg-primary)',
              borderRadius: '28px',
              width: '100%',
              maxWidth: '850px',
              position: 'relative',
              border: '1px solid var(--panel-border)',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--panel-border)',
                color: 'var(--text-primary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100,
                transition: 'background 0.2s, color 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              aria-label="Cerrar modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* Scrollable Container with elegant scrollbar styling */}
            <div 
              style={{ 
                padding: '3rem 2.5rem', 
                overflowY: 'auto', 
                flex: 1,
                scrollBehavior: 'smooth'
              }}
              className="custom-modal-scroll"
            >
              {children}
            </div>
          </motion.div>

          <style>{`
            .custom-modal-scroll::-webkit-scrollbar {
              width: 8px;
            }
            .custom-modal-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-modal-scroll::-webkit-scrollbar-thumb {
              background: var(--panel-border);
              border-radius: 99px;
            }
            .custom-modal-scroll::-webkit-scrollbar-thumb:hover {
              background: var(--text-secondary);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
