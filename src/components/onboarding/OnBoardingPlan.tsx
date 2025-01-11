import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import AddButton from '@src/components/common/button/AddButton';
import NextButton from '@src/components/common/button/NextButton';
import IconInfo from '@src/assets/icons/IconInfo.svg?react';
import Modal from '@src/components/common/modal/Modal';
import { useState } from 'react';
import IconBubble from '@src/assets/icons/IconBubblePlan.svg?react';
import IconGhost from '@src/assets/icons/IconGhost.svg?react';
import RoomInfo from '@src/components/onboarding/RoomInfo';

interface IOnBoardingPlanProps {
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void;
  setSelectedRoomId: (roomId: string) => void;
}

export default function OnBoardingPlan({
  setOnboardingStep,
  setSelectedRoomId,
}: IOnBoardingPlanProps) {
  const [clickedRoom, setClickedRoom] = useState<string>('');
  const [clickedRoomInfo, setClickedRoomInfo] = useState<{
    roomId: string;
    roomName: string;
  } | null>(null);
  const dummyData = {
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
    setClickedRoom(roomId);
  };
  const handleAddButtonClick = () => {
    setOnboardingStep(OnboardingStepType.ONBOARDING_CREATE_STEP);
  };
  const handleNextButtonClick = () => {
    setSelectedRoomId(clickedRoom);
    setOnboardingStep(OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP);
  };
  const handleInfoClick = (
    e: React.MouseEvent,
    room: { roomId: string; roomName: string },
  ) => {
    e.stopPropagation();
    setClickedRoomInfo(room);
  };
  const handleAddRoomClick = () => {
    setOnboardingStep(OnboardingStepType.ONBOARDING_CREATE_STEP);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {dummyData.data && dummyData.data.length > 0 ? (
          <div className="flex flex-col items-center mt-[4.6875rem]">
            <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
              어떤 모임을 계획하고 계시나요?
            </h1>
            <ul className="flex flex-col items-center w-full gap-[1.5rem] mb-[1.875rem] max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {dummyData.data.map((item) => (
                <li
                  key={item.roomId}
                  className={`flex items-center justify-between w-full text-menu text-tertiary bg-gray-light py-[0.875rem] px-[1.0625rem] rounded-default cursor-pointer ${
                    clickedRoom === item.roomId
                      ? 'border-4 border-blue-light02 bg-white-default'
                      : ''
                  }`}
                  onClick={() => handleRoomClick(item.roomId)}
                >
                  <span>{item.roomName}</span>
                  <span
                    className="hover:translate-y-[-0.1875rem]"
                    onClick={(e) => handleInfoClick(e, item)}
                  >
                    <IconInfo className="size-[1.5625rem]" />
                  </span>
                </li>
              ))}
            </ul>
            <AddButton
              onClick={handleAddButtonClick}
              buttonText="모임 추가"
              className="mb-[1.0625rem]"
            />
            <NextButton
              onClick={handleNextButtonClick}
              buttonText="다음"
              disabled={!clickedRoom}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[4.6875rem]">
            <span>
              <IconBubble />
            </span>
            <span>
              <IconGhost />
            </span>
            <h1 className="text-menu text-gray-dark my-[1.875rem]">
              모임을 생성하고 서비스를 사용해보세요!
            </h1>
            <div
              onClick={handleAddRoomClick}
              className="flex items-center justify-center rounded-full cursor-pointer size-20 bg-white-default text-primary text-subtitle shadow-default hover:translate-y-[-0.1875rem]"
            >
              +
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!clickedRoomInfo}
        onClose={() => setClickedRoomInfo(null)}
      >
        {clickedRoomInfo && (
          <RoomInfo
            room={clickedRoomInfo}
            onClose={() => setClickedRoomInfo(null)}
          />
        )}
      </Modal>
    </>
  );
}
