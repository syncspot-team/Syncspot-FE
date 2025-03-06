import { useNavigate, useParams } from 'react-router-dom';
import Button from '@src/components/common/button/Button';
import Modal from '@src/components/common/modal/Modal';
import { PATH } from '@src/constants/path';
import { MODAL_TYPE } from '@src/types/modalType';
import RecreateVoteModal from '@src/components/common/modal/RecreateVoteModal';
import { useModal } from '@src/hooks/useModal';
import { useGetPlaceVoteRoomCheckQuery } from '@src/state/queries/place/useGetPlaceVoteRoomCheckQuery';
import { useGetPlaceVoteResultQuery } from '@src/state/queries/place/useGetPlaceVoteResultQuery';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import { PlaceVoteResultDataType } from '@src/types/place/placeVoteResultResponseType';
import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';

export default function PlaceResultPage() {
  const { modalType, openModal, closeModal } = useModal();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const {
    data: placeVoteRoomCheckData,
    isLoading: isPlaceVoteRoomCheckLoading,
  } = useGetPlaceVoteRoomCheckQuery();
  const { data: placeVoteResultData, isLoading: isPlaceVoteResultLoading } =
    useGetPlaceVoteResultQuery({
      enabled: placeVoteRoomCheckData?.data.existence,
    });

  const locations: PlaceVoteResultDataType[] = (
    placeVoteResultData?.data ?? []
  ).sort(
    (a: PlaceVoteResultDataType, b: PlaceVoteResultDataType) =>
      b.count - a.count,
  );
  const hasVotes = locations.some((location) => location.count > 0);

  if (!isPlaceVoteRoomCheckLoading && !placeVoteRoomCheckData?.data.existence) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center py-6 bg-gray-light mt-[1.875rem] min-h-[calc(100dvh-8rem)] lg:max-h-[calc(100dvh-7rem)] mx-4 lg:mx-[7.5rem] rounded-md">
        <div className="flex flex-col justify-center items-center w-full lg:max-w-[43.75rem] h-[calc(100dvh-10rem)] lg:h-full px-4 lg:px-0">
          <h1 className="mb-6 lg:mb-2 text-subtitle lg:text-title text-blue-dark02">
            투표 결과
          </h1>
          <p className="hidden mb-6 text-content text-gray-dark lg:block">
            이번 모임 만남이 가능한 장소를 확인해보세요!
          </p>

          {!isPlaceVoteResultLoading && !hasVotes ? (
            <div className="flex flex-col">
              <IconDolphin className="size-60 lg:size-80 animate-customBounce" />
              <p className="flex justify-center my-1 lg:my-5 text-content lg:text-menu text-gray-dark">
                아직 투표한 사람이 없습니다...
              </p>
            </div>
          ) : (
            <ul className="w-full mb-8 flex flex-col gap-3 max-h-[calc(100dvh-15rem)] lg:max-h-[calc(100dvh-25rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {locations.map((location) => (
                <li
                  key={location.id}
                  className="flex items-center gap-4 *:text-description *:lg:text-content"
                >
                  <span className="p-3 text-center truncate rounded-lg shadow-sm lg:py-6 lg:px-8 text-menu-selected text-primary bg-white-default">
                    {location.count}표
                  </span>
                  <span className="flex-1 p-3 text-left truncate rounded-lg shadow-sm lg:py-6 lg:px-4 text-content lg:text-menu bg-white-default">
                    {location.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="w-full">
            <Button
              buttonType="primary"
              className="mb-[0.625rem] w-full px-[0.3125rem] lg:px-0"
              onClick={() => {
                navigate(PATH.PLACE_VOTE(roomId!));
              }}
            >
              {!hasVotes ? '투표하러 가기' : '투표 다시하기'}
            </Button>
            <Button
              buttonType="primary"
              className="w-full px-[0.3125rem] lg:px-0 bg-gray-normal hover:bg-gray-400"
              onClick={() => {
                openModal(MODAL_TYPE.RECREATE_VOTE_MODAL);
              }}
            >
              투표 재생성하기
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === MODAL_TYPE.RECREATE_VOTE_MODAL && (
          <RecreateVoteModal
            onConfirm={() => {
              navigate(PATH.PLACE_CREATE(roomId!));
            }}
            onClose={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
