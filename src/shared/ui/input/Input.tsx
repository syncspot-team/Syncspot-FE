import React, { forwardRef, Ref } from 'react';
import { mergeClassNames } from '@src/shared/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function InputWithRef(
  props: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { className, ...restProps } = props;

  return (
    <input
      ref={ref}
      className={mergeClassNames(
        'text-description py-[1.125rem] pl-[0.9375rem] rounded-default bg-gray-light placeholder:text-gray-normal',
        className,
      )}
      {...restProps} // Destructuring 후 나머지 props 사용
    />
  );
});

Input.displayName = 'Input';
