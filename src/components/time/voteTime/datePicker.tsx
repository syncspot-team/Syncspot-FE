import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useEffect, useState } from 'react';
import TimeSelectBox from './timeSelectBox';
import { ITimeDatePickerProps } from '@src/types/time/timeProps';
import { DATE_FORMATS, formatStringDate } from '../utils/formatDate';

export default function DatePicker({
  date,
  myVote,
  isChecked,
  onCheckboxChange,
  onChange,
}: ITimeDatePickerProps) {
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');

  useEffect(() => {
    if (myVote && myVote.memberAvailableStartTime) {
      const startTime = myVote.memberAvailableStartTime
        .split(' ')[1]
        .split(':');
      setStartHour(startTime[0]);
      setStartMinute(startTime[1]);
    }

    if (myVote && myVote.memberAvailableEndTime) {
      const endTime = myVote.memberAvailableEndTime.split(' ')[1].split(':');
      setEndHour(endTime[0]);
      setEndMinute(endTime[1]);
    }
  }, [myVote.memberAvailableStartTime, myVote.memberAvailableEndTime]);

  useEffect(() => {
    onChange(startHour, startMinute, endHour, endMinute);
  }, [startHour, startMinute, endHour, endMinute]);

  return (
    <div className="flex flex-col justify-center items-start bg-white-default rounded-[.75rem] lg:h-[7.5rem] h-28 my-4 p-4 no-transition">
      <div className="flex items-center mb-2 pointer-events-auto">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={onCheckboxChange}
          />
          {isChecked ? (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-light02">
              <span className="w-4 h-4 rounded-full bg-blue-normal01" />
            </span>
          ) : (
            <span className="w-6 h-6 rounded-full bg-gray-light" />
          )}
        </label>
        <span
          className={mergeClassNames(`ml-2.5 `, {
            'text-blue-dark03 text-menu-selected': isChecked,
            'text-gray-normal text-menu-selected': !isChecked,
          })}
        >
          {formatStringDate(date, undefined, DATE_FORMATS.MMDD)}
        </span>
      </div>
      <div
        className={mergeClassNames(
          'flex items-center lg:justify-between gap-1 flex-row w-full',
          {
            'text-gray-normal pointer-events-none': !isChecked,
            'text-black-default': isChecked,
          },
        )}
      >
        <TimeSelectBox
          initialHour={startHour}
          initialMinute={startMinute}
          onChange={(hour: string, minute: string) => {
            setStartHour(hour);
            setStartMinute(minute);
          }}
        />
        <p>~</p>
        <TimeSelectBox
          initialHour={endHour}
          initialMinute={endMinute}
          onChange={(hour: string, minute: string) => {
            setEndHour(hour);
            setEndMinute(minute);
          }}
        />
      </div>
    </div>
  );
}
