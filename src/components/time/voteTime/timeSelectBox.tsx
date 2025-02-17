import { ITimeSelectBoxProps } from '@src/types/time/timeProps';
import { useEffect, useState } from 'react';
import { Select } from './timeSelect';

export default function TimeSelectBox({
  initialHour,
  initialMinute,
  onChange,
}: ITimeSelectBoxProps) {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.padStart(2, '0');
    setHour(value);
    onChange(value, minute);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.padStart(2, '0');
    setMinute(value);
    onChange(hour, value);
  };

  useEffect(() => {
    setHour(initialHour);
    setMinute(initialMinute);
  }, [initialHour, initialMinute]);

  return (
    <div className="flex items-center justify-center w-full gap-4 ">
      <div className="relative inline-block w-[5.75rem]">
        <Select selectType="hour" value={hour} onChange={handleHourChange} />
      </div>

      <div className="relative inline-block w-[5.75rem]">
        <Select
          selectType="minute"
          value={minute}
          onChange={handleMinuteChange}
        />
      </div>
    </div>
  );
}
