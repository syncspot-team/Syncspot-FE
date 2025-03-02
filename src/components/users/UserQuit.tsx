import IconWarningTriangle from '@src/assets/icons/IconWarningTriangle.svg?react';
import Button from '../common/button/Button';
import { useState } from 'react';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';
import { useQuitUserMutation } from '@src/state/mutations/user/useQuitUserMutation';
import { useLoginStore } from '@src/state/store/loginStore';
import { useModal } from '@src/hooks/useModal';
import { MODAL_TYPE } from '@src/types/modalType';
import QuitModal from '../common/modal/QuitModal';
import Modal from '../common/modal/Modal';

export default function UserQuit() {
  const navigate = useNavigate();
  const { logout } = useLoginStore();
  const { modalType, openModal, closeModal } = useModal();
  const [withdrawalReason, setWithdrawalReason] = useState('');

  const { mutate: quitUser } = useQuitUserMutation();

  const handleQuit = () => {
    quitUser(
      { withdrawalReason },
      {
        onSuccess: () => {
          CustomToast({
            type: TOAST_TYPE.SUCCESS,
            message: '탈퇴가 완료되었습니다.',
          });
          logout();
          navigate(PATH.ROOT);
        },
      },
    );
  };

  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        <h3 className="my-4 mb-8 ml-1 font-semibold lg:mt-0 lg:ml-0 text-content lg:text-subtitle text-tertiary">
          회원 탈퇴
        </h3>
        <div className="flex flex-col gap-6 pb-6">
          <h4 className="font-semibold text-content lg:text-subtitle">
            정말 탈퇴하시겠어요?
          </h4>

          <div className="flex flex-col gap-3 text-description lg:text-content text-primary">
            <div className="flex items-start gap-2">
              <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
              <p>
                지금 탈퇴하시면 이전에 참여했던 모임들의 기록은 볼 수 없습니다.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
              <p>
                지금 탈퇴하시면 해당 계정으로 이용했던 내역은 모두 삭제되며,
                복구할 수 없습니다.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
              <p>
                지금 탈퇴하시면 30일 이내 재가입이 불가하며 서비스 이용이
                제한됩니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold underline text-content lg:text-menu">
              떠나시는 이유를 알려주세요
            </p>
            <p className="text-description lg:text-content text-gray-dark">
              싱크스팟을 아끼고 사랑해주신 시간에 감사드립니다.
              <br />
              서비스를 이용하며 느끼셨던 점을 저희에게 공유해주시면
              <br />
              더욱 유용한 서비스를 제공할 수 있는 싱크스팟이 되도록
              노력하겠습니다.
            </p>
            <textarea
              className="w-full h-32 p-4 mt-4 rounded-lg resize-none bg-gray-light"
              placeholder="탈퇴 사유를 입력해주세요"
              value={withdrawalReason}
              onChange={(e) => setWithdrawalReason(e.target.value)}
            />
          </div>

          <Button
            buttonType="quit"
            className="w-full px-[0.3125rem]"
            onClick={() => openModal(MODAL_TYPE.QUIT_MODAL)}
            disabled={!withdrawalReason.trim()}
          >
            계정 삭제하기
          </Button>
        </div>
      </div>
      {modalType === MODAL_TYPE.QUIT_MODAL && (
        <Modal
          isOpen={modalType === MODAL_TYPE.QUIT_MODAL}
          onClose={closeModal}
        >
          <QuitModal onConfirm={handleQuit} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
