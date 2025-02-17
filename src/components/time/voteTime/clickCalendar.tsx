import '@pages/time/TimeCreatePage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IconLeftArrow from '@src/assets/icons/IconLeftArrow.svg?react';
import IconRightArrow from '@src/assets/icons/IconRightArrow.svg?react';
import { ITimeResultProps } from '@src/types/time/timeProps';
import { useEffect, useRef, useState } from 'react';
import VoteResultByDate from './VoteResultByDate';

export default function ClickCalendar({ dates, result }: ITimeResultProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  // 외부 클릭 감지
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
    <div className="flex flex-col w-1/2 h-full gap-4" ref={componentRef}>
      <div className="w-full rounded-[1.25rem] p-3 text-blue-dark01 bg-gray-light text-menu-selected">
        <Calendar
          onChange={() => {}}
          value={null}
          locale="ko-KR"
          formatDay={(_locale, date) => date.getDate().toString()}
          navigationLabel={({ date }) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`
          }
          prevLabel={<IconLeftArrow className="size-7" />}
          nextLabel={<IconRightArrow className="size-7" />}
          prev2Label={null}
          next2Label={null}
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={true}
          className="w-full border-none calendar-custom"
          calendarType="gregory"
          tileClassName={({ date }) => {
            return dates.some((d) => d.getTime() === date.getTime())
              ? 'selected-date'
              : 'disabled-date';
          }}
          onClickDay={(date) => {
            setClickedDate(date);
          }}
        />
      </div>
      {/* 화면 확인 후 개선 */}
      {clickedDate && (
        <VoteResultByDate clickedDate={clickedDate} result={result} />
      )}
    </div>
  );
}
