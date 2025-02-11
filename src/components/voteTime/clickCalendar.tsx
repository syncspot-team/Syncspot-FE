import './clickCalendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IconLeftArrow from '@src/assets/icons/IconLeftArrow.svg?react';
import IconRightArrow from '@src/assets/icons/IconRightArrow.svg?react';
import { ITimeResultProps } from '@src/types/time/timeProps';
import { useEffect, useRef, useState } from 'react';

export default function ClickCalendar({ dates, result }: ITimeResultProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setClickedDate(date);
    //useGetTimeResultQuery()
    console.log(result, clickedDate);
  };

  //외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setClickedDate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col item-center justify-start w-[50%]">
      <div
        ref={componentRef}
        className="flex flex-col items-center justify-start w-full text-center rounded-2xl text-blue-dark01 bg-gray-light text-menu-selected"
      >
        <Calendar
          value={null}
          onChange={() => {}}
          locale="ko-KR"
          selectRange={false}
          formatDay={(_locale, date) => date.getDate().toString()} //일 제거
          calendarType="gregory" //일요일
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          prevLabel={<IconLeftArrow className="size-7" />}
          nextLabel={<IconRightArrow className="size-7" />}
          tileClassName={({ date }) =>
            dates.some((dates) => dates === date) ? 'selected' : ''
          }
          tileDisabled={({ date }) => !dates.some((dates) => dates === date)}
          onClickDay={(date) => {
            if (dates.some((dates) => dates === date)) {
              handleDateClick(date);
            }
          }}
        />
      </div>
      {/* 화면 확인 후 개선 */}
      {/* {clickedDate && (
          <VoteDate
            clickedDate={clickedDate}
            voteDateInfo={voteDateInfo}
            noVotes={noVotes}
          />
        )} */}
    </div>
  );
}
