import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="text-description py-[1.125rem] pr-[1.5rem] pl-[0.9375rem] rounded-default bg-gray-light placeholder:text-gray-normal"
      {...props}
    />
  );
});

Input.displayName = 'Input';
