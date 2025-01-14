import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="py-[1.3125rem] px-[1.5rem] rounded-default bg-gray-light placeholder:text-gray-normal"
      {...props}
    />
  );
});

Input.displayName = 'Input';
