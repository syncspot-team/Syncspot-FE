import { useEffect, useState } from 'react';
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
import {
  arraysEqual,
  formatDate,
  formatStringDate,
} from '@src/components/time/utils/formatDate';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useGetTimeDatesQuery } from '@src/state/queries/time';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';

export default function TimeCreatePage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const { data: getTimeDatesQuery } = useGetTimeDatesQuery();

  useEffect(() => {
    getTimeDatesQuery?.data.existence ? (
      setSelectedDates(getTimeDatesQuery.data.dates.map(formatDate))
    ) : (
      <SomethingWrongErrorPage />
    );
  }, [roomId, getTimeDatesQuery]);

  const { mutate: createTimeRoomMutation } = usePostTimeRoomMutation({
    onSuccess: () => {
      navigate(PATH.TIME_VOTE(roomId));
    },
  });

  const { mutate: updateTimeRoomMutation } = usePutTimeRoomMutation({
    onSuccess: () => {
      navigate(PATH.TIME_VOTE(roomId));
    },
  });

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

    const formattedDates = selectedDates.map((value) =>
      formatStringDate(value, 'yyyy-mm-dd'),
    );

    if (
      getTimeDatesQuery?.data.existence &&
      arraysEqual(getTimeDatesQuery?.data.dates, formattedDates)
    ) {
      navigate(PATH.TIME_VOTE(roomId));
    } else if (
      getTimeDatesQuery?.data.existence &&
      !arraysEqual(getTimeDatesQuery?.data.dates, formattedDates)
    ) {
      updateTimeRoomMutation({ dates: formattedDates });
    } else {
      createTimeRoomMutation({ dates: formattedDates });
    }
  };

  return (
    <div className="mt-[3rem] max-w-[37.5rem] py-8 my-0 mx-auto">
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
        tileClassName={({ date }) => {
          return selectedDates.some((d) => d.getTime() === date.getTime())
            ? 'selected-date'
            : '';
        }}
        onClickDay={handleDateClick}
      />

      <div className="flex flex-col items-center justify-center mt-3 text-menu-selected text-tertiary ">
        {selectedDates.length > 0 ? (
          selectedDates.map((date, index) => (
            <p key={index}>{formatStringDate(date)}</p>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <Button className="w-full mt-5" onClick={handleCreateClick}>
        시간 투표 생성
      </Button>
    </div>
  );
}
