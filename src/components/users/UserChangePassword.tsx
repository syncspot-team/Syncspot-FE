import { useModal } from '@src/hooks/useModal';
import Modal from '../common/modal/Modal';
import PasswordChangeModal from '../common/modal/PasswordChangeModal';
import { MODAL_TYPE } from '@src/types/modalType';

export default function UserChangePassword() {
  const { modalType, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex items-center justify-between mt-10 lg:mt-12">
        <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
          비밀번호
        </h2>
        <button
          type="button"
          className="px-4 py-2 font-semibold rounded-default text-white-default bg-primary hover:bg-secondary text-description lg:text-content"
          onClick={() => openModal(MODAL_TYPE.PASSWORD_CHANGE_MODAL)}
        >
          비밀번호 변경하기
        </button>
      </div>
      <Modal
        isOpen={modalType === MODAL_TYPE.PASSWORD_CHANGE_MODAL}
        onClose={closeModal}
      >
        <PasswordChangeModal onClose={closeModal} />
      </Modal>
    </>
  );
}
