import Button from '@src/components/common/button/Button';
import VoteResultGrid from '@src/components/time/resultTime/voteResultGrid';
import { PATH } from '@src/constants/path';
import { useNavigate, useParams } from 'react-router-dom';

export default function TimeResultPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  return (
    <div className="w-[80%] h-full flex flex-col bg-gray-light p-4 rounded-[20px] mx-auto">
      <div className="flex flex-col items-center justify-center mx-auto mt-5 font-bold text-title text-blue-dark03">
        <p className="mt-3">이번 모임 일시는...</p>
        <p className="mt-3 text-center text-menu-selected text-gray-dark">
          이번 모임 만남이 가능한 시간을 확인해보세요!
        </p>
      </div>

      {/* 투표 결과 */}
      <VoteResultGrid />

      <div className="bottom-0 flex justify-between w-full gap-4 mt-8">
        <Button onClick={() => navigate(PATH.TIME_VOTE(roomId))}>
          투표 다시하기
        </Button>
        <Button
          buttonType={'secondary'}
          onClick={() => navigate(PATH.TIME_CREATE(roomId))}
        >
          투표 재생성하기
        </Button>
      </div>
    </div>
  );
}
