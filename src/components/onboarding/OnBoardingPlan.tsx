import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import IconDetailInfo from '@src/assets/icons/IconDetailInfo.svg?react';
import Modal from '@src/components/common/modal/Modal';
import { useState } from 'react';
import IconBubble from '@src/assets/icons/IconBubblePlan.svg?react';
import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';
import Button from '@src/components/common/button/Button';
import RoomDetailInfoModal from '@src/components/common/modal/RoomDetailInfoModal';
import { useModal } from '@src/hooks/useModal';
import { MODAL_TYPE } from '@src/types/modalType';

interface IOnBoardingPlanProps {
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void;
  setSelectedRoomId: (roomId: string) => void;
}

interface IRoomDetailInfo {
  roomId: string;
  roomName: string;
}

export default function OnBoardingPlan({
  setOnboardingStep,
  setSelectedRoomId,
}: IOnBoardingPlanProps) {
  const { modalType, openModal, closeModal } = useModal();
  const [clickedRoomId, setClickedRoomId] = useState<string>('');
  const [selectedRoomInfo, setSelectedRoomInfo] =
    useState<IRoomDetailInfo | null>(null);
  const DUMMY_ROOM_LIST = {
    data: [
      { roomId: '1', roomName: '모임1' },
      { roomId: '2', roomName: '모임2' },
      { roomId: '3', roomName: '모임3' },
      { roomId: '4', roomName: '모임4' },
      { roomId: '5', roomName: '모임5' },
      { roomId: '6', roomName: '모임6' },
      { roomId: '7', roomName: '모임7' },
      { roomId: '8', roomName: '모임8' },
      { roomId: '9', roomName: '모임9' },
      { roomId: '10', roomName: '모임10' },
    ],
  };

  const handleRoomClick = (roomId: string) => {
    setClickedRoomId(roomId);
  };
  const handleAddButtonClick = () => {
    setOnboardingStep(OnboardingStepType.ONBOARDING_CREATE_STEP);
  };
  const handleNextButtonClick = () => {
    setSelectedRoomId(clickedRoomId);
    setOnboardingStep(OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP);
  };
  const handleDetailInfoClick = (
    e: React.MouseEvent,
    roomDetailInfo: IRoomDetailInfo,
  ) => {
    e.stopPropagation();
    setSelectedRoomInfo(roomDetailInfo);
    openModal(MODAL_TYPE.ROOM_DETAIL_INFO_MODAL);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {DUMMY_ROOM_LIST.data && DUMMY_ROOM_LIST.data.length > 0 ? (
          <div className="flex flex-col items-center mt-[4.6875rem]">
            <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
              어떤 모임을 계획하고 계시나요?
            </h1>
            <ul className="flex flex-col items-center w-full gap-[1.5rem] mb-[1.875rem] max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
              {DUMMY_ROOM_LIST.data.map((item) => (
                <li
                  key={item.roomId}
                  className={`flex items-center justify-between w-full text-content text-tertiary bg-gray-light py-[1rem] px-[1.0625rem] rounded-default cursor-pointer ${
                    clickedRoomId === item.roomId
                      ? 'ring-2 ring-blue-light02 bg-white-default'
                      : ''
                  }`}
                  onClick={() => handleRoomClick(item.roomId)}
                >
                  <span>{item.roomName}</span>
                  <span
                    className="hover:translate-y-[-0.1875rem]"
                    onClick={(e) => handleDetailInfoClick(e, item)}
                  >
                    <IconDetailInfo className="size-[1.5625rem]" />
                  </span>
                </li>
              ))}
            </ul>
            <Button
              onClick={handleAddButtonClick}
              buttonType="secondary"
              className="mb-[1.0625rem]"
            >
              모임 추가
            </Button>
            <Button
              onClick={handleNextButtonClick}
              buttonType="primary"
              disabled={!clickedRoomId}
            >
              다음
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[4.6875rem]">
            <span>
              <IconBubble />
            </span>
            <span>
              <IconDolphin className="animate-customBounce" />
            </span>
            <h1 className="text-menu text-gray-dark my-[1.875rem]">
              모임을 생성하고 서비스를 사용해보세요!
            </h1>
            <Button onClick={handleAddButtonClick} className="">
              모임 생성하기
            </Button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalType === MODAL_TYPE.ROOM_DETAIL_INFO_MODAL}
        onClose={closeModal}
      >
        {selectedRoomInfo && (
          <RoomDetailInfoModal room={selectedRoomInfo} onClose={closeModal} />
        )}
      </Modal>
    </>
  );
}
