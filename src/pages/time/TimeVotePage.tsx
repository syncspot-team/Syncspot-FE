import ClickCalendar from '@src/components/time/voteTime/clickCalendar';
import MyVote from '@src/components/time/voteTime/myVote';
import {
  useGetTimeDatesQuery,
  useGetTimeResultQuery,
  useGetTimeVotedQuery,
} from '@src/state/queries/time';
import { formatDate } from '@src/components/time/utils/formatDate';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';

export default function TimeVotePage() {
  //시간투표방 조회하고, dates 로 투표가능한 날짜 파악
  const { data: timeDatesRes } = useGetTimeDatesQuery();

  //투표여부 voteDate 에 myVotes 전달
  const { data: timeVotedRes } = useGetTimeVotedQuery();

  //clickCalendar 투표결과 확인 - 실시간 invalidate 개선
  const { data: timeResultRes } = useGetTimeResultQuery();

  if (!timeDatesRes?.data.existence) {
    return <SomethingWrongErrorPage />;
  }
  if (!timeDatesRes || !timeVotedRes || !timeResultRes) {
    return <div>Loading...</div>; // 데이터가 로딩 중임을 표시
  }
  //string 에서 Date 객체로 변환
  const timeDate = {
    existence: timeDatesRes.data.existence,
    dates: timeDatesRes.data.dates.map((date: string) => formatDate(date)),
  };
  //string 에서 Date 객체로 변환
  const timeVoted = {
    myVotesExistence: timeVotedRes.data.myVotesExistence,
    myVotes: timeVotedRes.data.myVotes,
  };

  return (
    <div className="flex flex-col p-4 lg:p-0 lg:flex-row lg:items-start items-center lg:mt-[5rem] mt-12 w-full max-w-[62.5rem] mx-auto gap-5">
      <ClickCalendar
        dates={timeDate.dates}
        result={timeResultRes.data.result}
      />

      <MyVote
        dates={timeDate.dates}
        myVotesExistence={timeVoted.myVotesExistence}
        myVotes={timeVoted.myVotes}
      />
    </div>
  );
}
