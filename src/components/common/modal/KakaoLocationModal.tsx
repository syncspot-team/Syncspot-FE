import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IKakaoLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function KakaoLocationModal({
  isOpen,
  onClose,
  children,
}: IKakaoLocationModalProps) {
  if (!isOpen) return null;

  const modalElement = document.getElementById('modal') as HTMLElement;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="fixed inset-0 bg-overlay" />
      <div
        className="absolute top-[4.5rem] left-0 right-0 mx-auto max-w-[31.25rem] z-50 bg-white-default rounded-default shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalElement,
  );
}
