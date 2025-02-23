import React, { forwardRef } from 'react';
import { mergeClassNames } from '@src/utils/mergeClassNames';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={mergeClassNames(
          'text-description py-[1.125rem] pl-[0.9375rem] rounded-default bg-gray-light placeholder:text-gray-normal',
          '[&:-webkit-autofill]:bg-gray-light [&:-webkit-autofill]:hover:bg-gray-light [&:-webkit-autofill]:focus:bg-gray-light [&:-webkit-autofill]:active:bg-gray-light',
          '[&:-webkit-autofill]:[transition:none] [&:-webkit-autofill]:[box-shadow:0_0_0_30px_theme(colors.gray.light)_inset]',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
