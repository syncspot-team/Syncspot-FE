import { useState } from 'react';
import IconLeftArrow from '@src/assets/icons/IconLeftArrow.svg?react';
import IconRightArrow from '@src/assets/icons/IconRightArrow.svg?react';
import Button from '@src/components/common/button/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TimeCreatePage.css';
import CustomToast from '@src/components/common/toast/customToast';
import {
  usePostTimeRoomMutation,
  usePutTimeRoomMutation,
} from '@src/state/mutations/time';
import { formatStringDate } from '@src/components/time/utils/formatDate';
import { useGetTimeDatesQuery } from '@src/state/queries/time';

export default function TimeCreatePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const { data: getTimeDatesQuery } = useGetTimeDatesQuery();

  const { mutate: createTimeRoomMutation } = usePostTimeRoomMutation();

  const { mutate: updateTimeRoomMutation } = usePutTimeRoomMutation();

  const handleDateClick = (date: Date) => {
    setSelectedDates((prev) => {
      const dateExists = prev.some((d) => d.getTime() === date.getTime());
      let updatedDates;

      if (dateExists) {
        return prev.filter((d) => d.getTime() !== date.getTime());
      } else {
        if (prev.length >= 5) {
          CustomToast({
            type: 'error',
            message: '최대 5개의 날짜만 선택할 수 있습니다.',
          });
          return prev;
        }
        updatedDates = [...prev, date];
      }
      return updatedDates.sort((a, b) => a.getTime() - b.getTime());
    });
  };

  const handleCreateClick = () => {
    if (selectedDates.length === 0) {
      CustomToast({
        type: 'error',
        message: '날짜를 선택해 주세요.',
      });
      return;
    }

    let formattedDates = selectedDates.map((value) => formatStringDate(value));

    if (getTimeDatesQuery?.data.existence) {
      updateTimeRoomMutation({ dates: formattedDates });
    } else {
      createTimeRoomMutation({ dates: formattedDates });
    }
  };

  return (
    <div
      className={`lg:mt-4 h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] relative max-w-[50rem] p-4 lg:p-0  mx-auto`}
    >
      <div className="pb-4 lg:px-[6.25rem] lg:h-[632px] min-h-[26.5rem] mb-4 mx-auto ">
        <Calendar
          value={selectedDates.length > 0 ? selectedDates[0] : null}
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
            return selectedDates.some((d) => d.getTime() === date.getTime())
              ? 'selected-date'
              : '';
          }}
          onClickDay={handleDateClick}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 mx-10 lg:mx-0 gap-2 my-auto min-h-[9rem] lg:min-h-0 lg:h-fit whitespace-nowrap lg:grid-cols-5 text-tertiary ">
        {selectedDates.length > 0 ? (
          selectedDates.map((date, index) => (
            <div
              key={index}
              className="flex p-2 px-3 mx-auto rounded-full bg-blue-light02 max-w-[8.4375rem] flex-row items-center h-10 text-description lg:text-content "
            >
              <p>{formatStringDate(date)}</p>
              <button
                className="ml-2 text-red-normal hover:text-subtitle "
                onClick={() => {
                  setSelectedDates((prev) =>
                    prev.filter((d) => d.getTime() !== date.getTime()),
                  );
                }}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <p className="h-10">날짜를 선택하세요.</p>
        )}
      </div>

      <Button
        className="w-full my-4 px-[0.3125rem] "
        onClick={handleCreateClick}
      >
        시간 투표 생성
      </Button>
    </div>
  );
}
