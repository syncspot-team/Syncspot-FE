import { useModal } from '@src/hooks/useModal';
import IconDetailInfo from '@src/assets/icons/IconDetailInfo.svg?react';
import { useState } from 'react';
import Modal from '../common/modal/Modal';
import RoomDetailInfoModal from '../common/modal/RoomDetailInfoModal';
import { MODAL_TYPE } from '@src/types/modalType';
import IconBubble from '@src/assets/icons/IconBubblePlan.svg?react';
import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';
import Button from '@src/components/common/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';

interface IRoomDetailInfo {
  roomId: string;
  roomName: string;
}

export default function UserGroupList() {
  const navigate = useNavigate();
  const { modalType, openModal, closeModal } = useModal();
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
      { roomId: '11', roomName: '모임11' },
      { roomId: '12', roomName: '모임12' },
      { roomId: '13', roomName: '모임13' },
      { roomId: '14', roomName: '모임14' },
      { roomId: '15', roomName: '모임15' },
    ],
  };

  const handleDetailInfoClick = (
    e: React.MouseEvent,
    roomDetailInfo: IRoomDetailInfo,
  ) => {
    e.stopPropagation();
    setSelectedRoomInfo(roomDetailInfo);
    openModal(MODAL_TYPE.ROOM_DETAIL_INFO_MODAL);
  };

  const handleCreateRoom = () => {
    navigate(PATH.ONBOARDING, {
      state: { initialStep: OnboardingStepType.ONBOARDING_CREATE_STEP },
    });
  };

  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        {DUMMY_ROOM_LIST.data && DUMMY_ROOM_LIST.data.length > 0 ? (
          <>
            <h3 className="my-4 mb-4 ml-1 lg:mt-0 lg:ml-0 text-menu lg:text-subtitle text-tertiary">
              전체 모임 목록
            </h3>
            <ul className="flex-1 flex flex-col items-center w-full gap-[1.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {DUMMY_ROOM_LIST.data.map((item) => (
                <li
                  key={item.roomId}
                  className={`flex items-center justify-between w-full text-description lg:text-content text-tertiary bg-gray-light py-[1rem] px-[1.0625rem] rounded-default 
                  `}
                >
                  <span>{item.roomName}</span>
                  <span
                    className="hover:translate-y-[-0.125rem] lg:hover:translate-y-[-0.1875rem]"
                    onClick={(e) => handleDetailInfoClick(e, item)}
                  >
                    <IconDetailInfo className="size-5 lg:size-[1.5625rem] cursor-pointer" />
                  </span>
                </li>
              ))}
            </ul>
          </>
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
            <Button onClick={handleCreateRoom} className="">
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
