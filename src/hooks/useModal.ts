import { useState } from 'react';
import { ModalType } from '@src/types/modalType';

export function useModal() {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return {
    modalType,
    openModal,
    closeModal,
  };
}
