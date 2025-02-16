import ClickCalendar from '@src/components/time/voteTime/clickCalendar';
import MyVote from '@src/components/time/voteTime/myVote';
import {
  useGetTimeDatesQuery,
  useGetTimeResultQuery,
  useGetTimeVotedQuery,
} from '@src/state/queries/time';
import { formatDate } from '@src/components/time/utils/formatDate';
import { useRef } from 'react';

export default function TimeVotePage() {
  const componentRef = useRef<HTMLDivElement>(null);

  //시간투표방 조회하고, dates 로 투표가능한 날짜 파악
  const { data: timeDatesRes } = useGetTimeDatesQuery();
  if (!timeDatesRes) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  //string 에서 Date 객체로 변환
  const timeDate = {
    existence: timeDatesRes.data.existence,
    dates: timeDatesRes.data.existence
      ? timeDatesRes.data.dates.map((date) => formatDate(date))
      : [],
  };

  //투표여부 voteDate 에 myVotes 전달
  const { data: timeVotedRes } = useGetTimeVotedQuery();
  if (!timeVotedRes) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  //string 에서 Date 객체로 변환
  const timeVoted = {
    myVotesExistence: timeVotedRes.myVotesExistence,
    myVotes: timeVotedRes.myVotes,
  };

  //clickCalendar 투표결과 확인 - 실시간 invalidate 개선
  const { data: timeResultRes } = useGetTimeResultQuery();
  if (!timeResultRes) {
    return <div>데이터를 불러오는 중입니다...</div>; // 로딩 상태 또는 에러 메시지 표시
  }

  return (
    <div ref={componentRef} className="flex gap-2">
      <ClickCalendar dates={timeDate.dates} result={timeResultRes.result} />

      <MyVote
        dates={timeDate.dates}
        myVotesExistence={timeVoted.myVotesExistence}
        myVotes={timeVoted.myVotes}
      />
    </div>
  );
}
