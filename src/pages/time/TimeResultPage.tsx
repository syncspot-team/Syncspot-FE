import Button from '@src/components/common/button/Button';
import VoteResultGrid from '@src/components/time/resultTime/voteResultGrid';
import { PATH } from '@src/constants/path';
import { useGetTimeDatesQuery } from '@src/state/queries/time';
import { useNavigate, useParams } from 'react-router-dom';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';

export default function TimeResultPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { data: timeDatesRes } = useGetTimeDatesQuery();
  if (!timeDatesRes?.data.existence) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <div className="h-full bg-gray-light p-4 rounded-[1.25rem] grid grid-cols-1 lg:mx-[7.5rem] m-4 mt-8">
      <div className="flex flex-col items-center justify-center gap-4 mx-auto mt-8 text-title text-blue-dark03">
        <p>이번 모임 일시는...</p>
        <p className="text-center text-menu-selected text-gray-dark">
          이번 모임 만남이 가능한 시간을 확인해보세요!
        </p>
      </div>

      {/* 투표 결과 */}
      <VoteResultGrid />

      <div className="flex flex-col items-center justify-center w-full gap-4 mt-12 lg:flex-row">
        <Button
          onClick={() => navigate(PATH.TIME_VOTE(roomId))}
          className="w-full px-[0.3125rem]"
        >
          투표 다시하기
        </Button>
        <Button
          buttonType={'secondary'}
          onClick={() => navigate(PATH.TIME_CREATE(roomId))}
          className="w-full px-[0.3125rem]"
        >
          투표 재생성하기
        </Button>
      </div>
    </div>
  );
}
