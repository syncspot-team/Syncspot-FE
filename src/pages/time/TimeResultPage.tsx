import Button from '@src/components/common/button/Button';
import VoteResultGrid from '@src/components/time/resultTime/voteResultGrid';
import { PATH } from '@src/constants/path';
import {
  useGetTimeDatesQuery,
  useGetTimeVotedQuery,
} from '@src/state/queries/time';
import { useNavigate, useParams } from 'react-router-dom';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';
import { useEffect, useState } from 'react';
import { Loading } from '@src/components/loading/Loading';
import Modal from '@src/components/common/modal/Modal';
import RecreateVoteModal from '@src/components/common/modal/RecreateVoteModal';
import { MODAL_TYPE } from '@src/types/modalType';
import { useModal } from '@src/hooks/useModal';

export default function TimeResultPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: timeDatesRes, isLoading: timeDatesLoading } =
    useGetTimeDatesQuery();
  const { data: timeVotedRes, isLoading: timeVotedLoading } =
    useGetTimeVotedQuery();

  const { modalType, openModal, closeModal } = useModal();

  if (timeDatesLoading || timeVotedLoading) {
    return <Loading />;
  }
  if (!timeDatesRes?.data.existence) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <>
      <div className="h-full bg-white-default p-4 lg:px-36 pt-0 lg:p-4 grid grid-cols-1 lg:mx-[7.5rem] lg:mt-[1.875rem]">
        <div className="flex flex-col mb-2 justify-center w-full mx-2 mt-4 gap-[.4375rem] lg:gap-4 lg:mt-8 lg:mx-auto lg:items-center text-menu-selected lg:text-title text-blue-dark02">
          <p>이번 모임 일시는...</p>
          <p className="lg:text-center text-description lg:text-menu-selected text-gray-dark">
            이번 모임 만남이 가능한 시간을 확인해보세요!
          </p>
        </div>
        <div className="px-4 lg:px-0">
          {/* 투표 결과 */}
          <VoteResultGrid isMobile={isMobile} />

          <div className="flex flex-col items-center justify-center w-full gap-4 mt-8 lg:mt-12 lg:flex-row">
            <Button
              onClick={() => navigate(PATH.TIME_VOTE(roomId))}
              className="w-full px-[0.3125rem]"
            >
              {timeVotedRes?.data.myVotesExistence
                ? '투표 다시 하기'
                : '투표하러 가기'}
            </Button>
            <Button
              buttonType={'secondary'}
              onClick={() => openModal(MODAL_TYPE.RECREATE_VOTE_MODAL)}
              className="w-full px-[0.3125rem]"
            >
              새 투표 생성하기
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === MODAL_TYPE.RECREATE_VOTE_MODAL && (
          <RecreateVoteModal
            onConfirm={() => {
              navigate(PATH.TIME_CREATE(roomId!));
            }}
            onClose={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
