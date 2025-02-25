import IconShare from '@src/assets/icons/IconShare.svg?react';
import Modal from '@src/components/common/modal/Modal';
import ShareMeetingModal from '@src/components/common/modal/ShareMeetingModal';
import { useModal } from '@src/hooks/useModal';
import { MODAL_TYPE } from '@src/types/modalType';

interface IShareButtonProps {
  onShareClick: () => void;
}

export default function ShareButton({ onShareClick }: IShareButtonProps) {
  const { modalType, openModal, closeModal } = useModal();

  const handleClick = () => {
    onShareClick();
    openModal(MODAL_TYPE.SHARE_MEETING_MODAL);
  };

  return (
    <>
      <li
        onClick={handleClick}
        className="rounded-full cursor-pointer p-[5px] shadow-black filter hover:bg-blue-light01"
      >
        <IconShare className="size-4" />
      </li>
      <Modal
        isOpen={modalType === MODAL_TYPE.SHARE_MEETING_MODAL}
        onClose={closeModal}
      >
        <ShareMeetingModal onClose={closeModal} />
      </Modal>
    </>
  );
}
