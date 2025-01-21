import { useState } from 'react';
import IconLeftArrow from '@src/assets/icons/IconLeftArrow.svg?react';
import IconRightArrow from '@src/assets/icons/IconRightArrow.svg?react';
import Button from '@src/components/common/button/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TimeCreatePage.css';
import CustomToast from '@src/components/common/toast/customToast';

export default function TimeCreatePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateClick = (date: Date) => {
    setSelectedDates((prev) => {
      const dateExists = prev.some(
        (d) => d.toDateString() === date.toDateString(),
      );

      if (dateExists) {
        return prev.filter((d) => d.toDateString() !== date.toDateString());
      }

      if (prev.length >= 5) {
        CustomToast({
          type: 'error',
          message: '최대 5개의 날짜만 선택할 수 있습니다.',
        });
        return prev;
      }

      return [...prev, date];
    });
  };

  const handleCreateClick = () => {
    console.log('선택된 날짜들:', selectedDates);
  };

  return (
    <div className="mt-[5rem] max-w-[37.5rem] py-8 my-0 mx-auto">
      <Calendar
        onChange={() => {}}
        value={null}
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
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const isSelected = selectedDates.some(
              (d) => d.toDateString() === date.toDateString(),
            );
            if (isSelected) {
              return 'selected-date';
            }
          }
          return null;
        }}
        onClickDay={handleDateClick}
      />
      <Button className="w-full mt-5" onClick={handleCreateClick}>
        시간 투표 생성
      </Button>
    </div>
  );
}
