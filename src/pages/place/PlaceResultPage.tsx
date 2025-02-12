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

export default function PlaceResultPage() {
  const { modalType, openModal, closeModal } = useModal();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { data: placeVoteRoomCheckData } = useGetPlaceVoteRoomCheckQuery();
  const { data: placeVoteResultData } = useGetPlaceVoteResultQuery({
    enabled: placeVoteRoomCheckData?.data.existence,
  });

  const locations: PlaceVoteResultDataType[] = (
    placeVoteResultData?.data ?? []
  ).sort(
    (a: PlaceVoteResultDataType, b: PlaceVoteResultDataType) =>
      b.count - a.count,
  );
  const hasVotes = locations.some((location) => location.count > 0);

  if (!placeVoteRoomCheckData?.data.existence) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center py-6 bg-gray-light mt-[1.875rem] min-h-[calc(100vh-8rem)]">
        <div className="flex flex-col justify-center items-center max-w-[43.75rem]">
          <h1 className="mb-6 lg:mb-2 text-subtitle lg:text-title text-blue-dark02">
            투표 결과
          </h1>
          <p className="hidden mb-6 text-content text-gray-dark lg:block">
            이번 모임 만남이 가능한 장소를 확인해보세요!
          </p>

          {!hasVotes ? (
            <p className=" flex flex-col justify-center items-center mb-8 text-subtitle text-gray-dark min-h-[calc(100vh-30rem)]">
              아직 투표한 사람이 없습니다...
            </p>
          ) : (
            <ul className="mb-8 flex flex-col gap-3 max-h-[calc(100vh-26rem)] lg:max-h-[calc(100vh-28rem)] w-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {locations.map((location) => (
                <li
                  key={location.id}
                  className="flex items-center gap-4 *:text-description *:lg:text-content"
                >
                  <span className="py-6 px-8 rounded-lg shadow-sm text-menu-selected text-primary bg-white-default w-[7rem] text-center truncate">
                    {location.count}표
                  </span>
                  <span className="py-6 px-4 rounded-lg shadow-sm text-left text-menu bg-white-default w-[21rem] truncate">
                    {location.name}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 lg:mt-2">
            <Button
              buttonType="primary"
              className="mb-[0.625rem] w-[28rem]"
              onClick={() => {
                navigate(PATH.PLACE_VOTE(roomId!));
              }}
            >
              {!hasVotes ? '투표하러 가기' : '투표 다시하기'}
            </Button>
            <Button
              buttonType="primary"
              className="w-[28rem]"
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
