import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: IModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const modalElement = document.getElementById('modal') as HTMLElement;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-overlay" onClick={onClose} />
      <div className="relative z-50 p-6 bg-gray-light rounded-default">
        {children}
      </div>
    </div>,
    modalElement,
  );
}
