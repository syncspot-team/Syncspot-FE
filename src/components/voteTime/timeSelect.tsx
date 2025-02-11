import React, { forwardRef } from 'react';
import './timeSelect.css';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import IconTimeDropdown from '@src/assets/icons/IconTimeDropdown.svg?react';
import { formatTime } from '@src/utils/formatTime';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  selectType: 'hour' | 'minute';
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, selectType, ...props }, ref) => {
    return (
      <>
        <select
          ref={ref}
          className={mergeClassNames(`custom-select`, className)}
          {...props}
        >
          {/* selectType hour일때 */}
          {selectType === 'hour' &&
            Array.from({ length: 24 }, (_, index) => (
              <option key={index} value={index} className="bg-white">
                {formatTime(index)} 시
              </option>
            ))}
          {/* selectType minute일때 */}
          {selectType === 'minute' &&
            Array.from({ length: 6 }, (_, index) => (
              <option key={index} value={index * 10} className="bg-white">
                {formatTime(index * 10)} 분
              </option>
            ))}
        </select>
        <span className="custom-arrow">
          <IconTimeDropdown className="text-title" />
        </span>
      </>
    );
  },
);
