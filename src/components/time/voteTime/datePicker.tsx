import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useState } from 'react';
import TimeSelectBox from './timeSelectBox';
import { ITimeDatePickerProps } from '@src/types/time/timeProps';
import { formatStringDate } from '../utils/formatDate';

export default function DatePicker({
  date,
  myVote,
  isChecked,
  onCheckboxChange,
  onChange,
}: ITimeDatePickerProps) {
  // 구조분해할당
  const startTime = myVote.memberAvailableStartTime
    ? myVote.memberAvailableStartTime.split(' ')[1].split(':')
    : ['00', '00'];
  const endTime = myVote.memberAvailableEndTime
    ? myVote.memberAvailableEndTime.split(' ')[1].split(':')
    : ['00', '00'];

  const initialHourStart = startTime[0]; // hh
  const initialMinuteStart = startTime[1]; // mm

  const initialHourEnd = endTime[0]; // hh
  const initialMinuteEnd = endTime[1]; // mm

  const [startHour, setStartHour] = useState(initialHourStart);
  const [startMinute, setStartMinute] = useState(initialMinuteStart);
  const [endHour, setEndHour] = useState(initialHourEnd);
  const [endMinute, setEndMinute] = useState(initialMinuteEnd);

  return (
    <div className="flex flex-col justify-center items-start  bg-white-default rounded-[.75rem] lg:h-[7.5rem] h-36 my-4 p-4">
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
          {formatStringDate(date, 'mmdd')}
        </span>
      </div>
      <div
        className={mergeClassNames(
          'flex items-center lg:justify-between  gap-1 lg:flex-row flex-col w-full',
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
            onChange(startHour, startMinute, endHour, endMinute);
          }}
        />
        <div className="flex items-center gap-1 w-fit">
          <p>~</p>
          <TimeSelectBox
            initialHour={endHour}
            initialMinute={endMinute}
            onChange={(hour: string, minute: string) => {
              setEndHour(hour);
              setEndMinute(minute);
              onChange(startHour, startMinute, endHour, endMinute);
              console.log(endHour, endMinute);
            }}
          />
        </div>
      </div>
    </div>
  );
}
