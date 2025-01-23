import React, { forwardRef } from 'react';
import { mergeClassNames } from '@src/utils/mergeClassNames';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={mergeClassNames(
          'text-description py-[1.125rem] pl-[0.9375rem] pr-[1.5rem] rounded-default bg-gray-light placeholder:text-gray-normal',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
