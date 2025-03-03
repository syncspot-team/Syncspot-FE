import ClickCalendar from '@src/components/time/voteTime/clickCalendar';
import MyVote from '@src/components/time/voteTime/myVote';
import { useGetTimeDatesQuery } from '@src/state/queries/time';
import { formatDate } from '@src/components/time/utils/formatDate';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';
import { useEffect, useState } from 'react';
import { Loading } from '@src/components/loading/Loading';

export default function TimeVotePage() {
  const bottomSheetHeight = window.innerHeight * 0.5;

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

  //시간투표방 조회하고, dates 로 투표가능한 날짜 파악
  const { data: timeDatesRes, isLoading: timeDatesLoading } =
    useGetTimeDatesQuery();

  if (timeDatesLoading) {
    return <Loading />;
  }

  if (!timeDatesLoading && !timeDatesRes?.data?.existence) {
    return <SomethingWrongErrorPage />;
  }
  //string 에서 Date 객체로 변환
  const timeDate = {
    existence: timeDatesRes.data.existence,
    dates: timeDatesRes.data.dates.map((date: string) => formatDate(date)),
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem] mx-auto lg:p-0 lg:flex-row lg:items-start">
      <ClickCalendar dates={timeDate.dates} />
      {!isMobile ? (
        // 데스크탑
        <div className="hidden lg:block">
          <MyVote
            dates={timeDate.dates}
            bottomSheetHeight={bottomSheetHeight}
          />
        </div>
      ) : (
        // 모바일
        <div className="lg:hidden">
          <BottomSheet isTime={true}>
            <MyVote
              dates={timeDate.dates}
              bottomSheetHeight={bottomSheetHeight}
            />
          </BottomSheet>
        </div>
      )}
    </div>
  );
}
