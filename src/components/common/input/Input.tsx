import React from 'react';

interface IInput {
  placeholder: string;
  type: 'text' | 'email' | 'password' | string;
  maxLength: number;
  [key: string]: any;
}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({ placeholder, type, maxLength, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="w-full py-2 pl-5 transition border-none outline-none rounded-xl h-[4rem] bg-gray-light focus:shadow-focus placeholder:text-gray-normal"
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
export default Input;
