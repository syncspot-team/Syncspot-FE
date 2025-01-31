import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import Modal from '../common/modal/Modal';
import { useState } from 'react';
import { useLoginStore } from '@src/state/store/loginStore';

export default function UserLogout() {
  const { logout } = useLoginStore();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATH.ROOT);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <div className="w-[17.5rem] lg:w-[20rem] flex flex-col items-center">
        <h2 className="mb-4 font-semibold text-subtitle">로그아웃</h2>
        <p className="mb-8 text-center text-description lg:text-content">
          정말 로그아웃 하시겠습니까?
        </p>
        <div className="flex w-full gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border rounded-default border-gray-normal text-gray-dark hover:bg-gray-light"
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 rounded-default bg-primary text-white-default hover:bg-secondary"
          >
            로그아웃
          </button>
        </div>
      </div>
    </Modal>
  );
}
