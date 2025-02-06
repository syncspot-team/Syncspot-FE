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
import { IRoom } from '@src/types/header/joinRoomResponseType';
import { useGetJoinRoomQuery } from '@src/state/queries/header/useGetJoinRoomQuery';
import { Loading } from '@src/components/loading/Loading';

interface IOnBoardingPlanProps {
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void;
  setSelectedRoomId: (roomId: string) => void;
  setSelectedRoomName: (roomName: string) => void;
}

export default function OnBoardingPlan({
  setOnboardingStep,
  setSelectedRoomId,
  setSelectedRoomName,
}: IOnBoardingPlanProps) {
  const { modalType, openModal, closeModal } = useModal();
  const [clickedRoomId, setClickedRoomId] = useState('');
  const [clickedRoomName, setClickedRoomName] = useState('');
  const [clickedRoomInfo, setClickedRoomInfo] = useState<IRoom | null>(null);
  const { data: roomList, isLoading: isRoomListLoading } =
    useGetJoinRoomQuery();

  const handleRoomClick = (roomId: string, roomName: string) => {
    setClickedRoomId(roomId);
    setClickedRoomName(roomName);
  };
  const handleAddButtonClick = () => {
    setOnboardingStep(OnboardingStepType.ONBOARDING_CREATE_STEP);
  };
  const handleNextButtonClick = () => {
    setSelectedRoomId(clickedRoomId);
    setSelectedRoomName(clickedRoomName);
    setOnboardingStep(OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP);
  };
  const handleDetailInfoClick = (e: React.MouseEvent, roomInfo: IRoom) => {
    e.stopPropagation();
    setClickedRoomInfo(roomInfo);
    openModal(MODAL_TYPE.ROOM_DETAIL_INFO_MODAL);
  };

  if (isRoomListLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        {roomList.data && roomList.data.length > 0 ? (
          <div className="flex flex-col items-center mt-[4.6875rem]">
            <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
              어떤 모임을 계획하고 계시나요?
            </h1>
            <ul className="flex flex-col items-center w-full gap-[1.5rem] mb-[1.875rem] max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
              {roomList.data.map((item: IRoom) => (
                <li
                  key={item.roomId}
                  className={`flex items-center justify-between w-full max-w-[26.875rem] text-content text-tertiary bg-gray-light py-[1rem] px-[1.0625rem] rounded-default cursor-pointer ${
                    clickedRoomId === item.roomId
                      ? 'ring-2 ring-blue-light02 bg-white-default'
                      : ''
                  }`}
                  onClick={() => handleRoomClick(item.roomId, item.roomName)}
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
        {clickedRoomInfo && (
          <RoomDetailInfoModal room={clickedRoomInfo} onClose={closeModal} />
        )}
      </Modal>
    </>
  );
}
