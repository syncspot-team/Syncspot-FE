import React, { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { mergeClassNames } from '@src/shared/utils';

export const ButtonVariants = cva(
  `
  flex items-center justify-center  
  rounded-default text-white-default truncate
  disabled:cursor-not-allowed
  disabled:bg-disabled
  disabled:border-disabled
  disabled:text-white-default
  `,
  {
    variants: {
      buttonType: {
        primary: 'bg-primary hover:bg-secondary',
        secondary: 'bg-gray-normal hover:bg-gray-400',
        quit: 'bg-gray-normal enabled:bg-red-normal',
        tab: 'bg-transparent hover:bg-gray-light text-gray-dark',
      },
      fontsize: {
        default: 'text-content lg:text-menu',
        description: 'text-description',
      },
      width: {
        default: 'w-[26.25rem] h-[3.4375rem] py-[1.125rem] px-[12.3125rem]',
        tab: 'px-4 py-2',
      },
    },
    defaultVariants: {
      buttonType: 'primary',
      fontsize: 'default',
      width: 'default',
    },
  },
);

interface IButtonProps
  extends VariantProps<typeof ButtonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  buttonType,
  fontsize,
  width,
  className,
  children,
  onClick,
  isLoading,
  disabled,
}: IButtonProps) {
  return (
    <button
      className={mergeClassNames(
        ButtonVariants({ buttonType, fontsize, width, className }),
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? '잠시만 기다려 주세요...' : children}
    </button>
  );
}
