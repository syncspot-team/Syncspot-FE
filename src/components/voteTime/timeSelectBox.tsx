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
    setHour(initialHour.padStart(2, '0'));
    setMinute(initialMinute.padStart(2, '0'));
  }, [initialHour, initialMinute]);

  return (
    <div className="flex items-center justify-between w-full realtive">
      <div className="relative inline-block w-22">
        <Select selectType="hour" value={hour} onChange={handleHourChange} />
      </div>

      <div className="relative inline-block w-22">
        <Select
          selectType="minute"
          value={minute}
          onChange={handleMinuteChange}
        />
      </div>
    </div>
  );
}
