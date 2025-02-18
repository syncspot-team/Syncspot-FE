import { useModal } from '@src/hooks/useModal';
import IconDetailInfo from '@src/assets/icons/IconDetailInfo.svg?react';
import { useState } from 'react';
import Modal from '../common/modal/Modal';
import RoomDetailInfoModal from '../common/modal/RoomDetailInfoModal';
import { MODAL_TYPE, ModalType } from '@src/types/modalType';
import IconBubble from '@src/assets/icons/IconBubblePlan.svg?react';
import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';
import Button from '@src/components/common/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useGetJoinRoomQuery } from '@src/state/queries/header/useGetJoinRoomQuery';
import { IRoom } from '@src/types/header/joinRoomResponseType';
import { Loading } from '@src/components/loading/Loading';

function RoomList({
  openModal,
  roomListData,
  setSelectedRoomInfo,
}: {
  roomListData: IRoom[];
  setSelectedRoomInfo: (room: IRoom) => void;
  openModal: (modalType: ModalType) => void;
}) {
  function handleDetailInfoClick(e: React.MouseEvent, roomDetailInfo: IRoom) {
    e.stopPropagation();
    setSelectedRoomInfo(roomDetailInfo);
    openModal(MODAL_TYPE.ROOM_DETAIL_INFO_MODAL);
  }

  return (
    <>
      <h3 className="my-4 mb-4 lg:mb-6 ml-1 lg:mt-0 lg:ml-0 font-semibold text-[1.25rem] lg:text-subtitle text-tertiary">
        전체 모임 목록
      </h3>
      <ul className="flex-1 flex flex-col items-center w-full gap-[0.625rem] lg:gap-[0.75rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {roomListData.map((item: IRoom) => (
          <li
            key={item.roomId}
            className={`flex items-center justify-between w-full text-description lg:text-content text-tertiary bg-gray-light py-[1rem] px-[1.0625rem] rounded-default`}
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
  );
}

function EmptyRoomList() {
  const navigate = useNavigate();

  return (
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
      <Button
        onClick={() => {
          navigate(PATH.ONBOARDING, {
            state: {
              initialStep: OnboardingStepType.ONBOARDING_CREATE_STEP,
            },
          });
        }}
        className=""
      >
        모임 생성하기
      </Button>
    </div>
  );
}

export default function UserGroupList() {
  const { modalType, openModal, closeModal } = useModal();
  const { data: roomListResponse, isLoading: isRoomListLoading } =
    useGetJoinRoomQuery();
  const [selectedRoomInfo, setSelectedRoomInfo] = useState<IRoom | null>(null);

  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        {isRoomListLoading ? (
          <Loading />
        ) : roomListResponse?.data && roomListResponse.data.length > 0 ? (
          <RoomList
            roomListData={roomListResponse.data}
            setSelectedRoomInfo={setSelectedRoomInfo}
            openModal={openModal}
          />
        ) : (
          <EmptyRoomList />
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
