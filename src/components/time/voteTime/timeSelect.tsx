import React, { forwardRef } from 'react';
import './timeSelect.css';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import IconTimeDropdown from '@src/assets/icons/IconTimeDropdown.svg?react';
import { formatTime } from '@src/components/time/utils/formatTime';

const SELECT_TYPES = {
  HOUR: 'hour' as const,
  MINUTE: 'minute' as const,
};

type SelectType = (typeof SELECT_TYPES)[keyof typeof SELECT_TYPES];

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  selectType: SelectType;
  value: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, selectType, value, ...props }, ref) => {
    return (
      <>
        <select
          ref={ref}
          className={mergeClassNames(`custom-select`, className)}
          value={value}
          {...props}
        >
          {/* selectType hour일때 */}
          {selectType === SELECT_TYPES.HOUR &&
            Array.from({ length: 24 }, (_, index) => (
              <option
                key={index}
                value={formatTime(index)}
                className="bg-white-default"
              >
                {formatTime(index)} 시
              </option>
            ))}
          {/* selectType minute일때 */}
          {selectType === SELECT_TYPES.MINUTE &&
            Array.from({ length: 6 }, (_, index) => (
              <option
                key={index}
                value={formatTime(index * 10)}
                className="bg-white-default"
              >
                {formatTime(index * 10)} 분
              </option>
            ))}
        </select>
        <span className="custom-arrow">
          <IconTimeDropdown className="size-4" />
        </span>
      </>
    );
  },
);
