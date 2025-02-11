import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useState } from 'react';
import TimeSelectBox from './timeSelectBox';
import { ITimeDatePickerProps } from '@src/types/time/timeProps';

export default function DatePicker({
  date,
  myVote,
  onChange,
}: ITimeDatePickerProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // 구조분해할당
  const startTime = myVote.memberAvailableStartTime.split(':');
  const endTime = myVote.memberAvailableEndTime.split(':');

  const initialHourStart = startTime[0] || '00'; // hh
  const initialMinuteStart = startTime[1] || '00'; // mm
  
  const initialHourEnd = endTime[0] || '00'; // hh
  const initialMinuteEnd = endTime[1] || '00'; // mm

  const handleTimeChange = (
    startHour: string,
    startMinute: string,
    endHour: string,
    endMinute: string,
  ) => {
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;
    onChange(start, end);
  };

  return (
    <div
      className={mergeClassNames(
        `flex flex-col justify-center items-start mb-2.5 bg-white rounded-[15px] h-[120px] w-[95%] mx-auto p-4
        `,
        { 'text-gray-normal pointer-events-none': !isChecked },
      )}
    >
      <div className="flex items-center mb-2 ml-2 pointer-events-auto">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          {isChecked ? (
            <span className="w-5 h-5 border-0 rounded-full bg-blue-normal01" />
          ) : (
            <span className="w-5 h-5 border-0 rounded-full bg-gray-light" />
          )}
        </label>
        <span
          className={mergeClassNames(`mx-2.5 `, {
            'text-blue-dark03': isChecked,
            'text-gray-normal': !isChecked,
          })}
        >
          {date.toISOString()}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1 mx-auto w-[95%]">
        <TimeSelectBox
          initialHour={initialHourStart}
          initialMinute={initialMinuteStart}
          onChange={(hour: string, minute: string) =>
            handleTimeChange(hour, minute, initialHourEnd, initialMinuteEnd)
          }
        />
        <p>~</p>
        <TimeSelectBox
          initialHour={initialHourEnd}
          initialMinute={initialMinuteEnd}
          onChange={(hour: string, minute: string) =>
            handleTimeChange(hour, minute, initialHourEnd, initialMinuteEnd)
          }
        />
      </div>
    </div>
  );
}
