import React, { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { mergeClassNames } from '../../../utils/mergeClassNames';

export const ButtonVariants = cva(
  `
  flex items-center justify-center   
  disabled:cursor-not-allowed
  disabled:bg-disabled
  disabled:border-disabled
  `,
  {
    variants: {
      buttonType: {
        primary:
          'w-max h-[4rem] bg-primary rounded-default border-primary py-[1.125rem] px-[12.3125rem] hover:bg-secondary hover:border-secondary text-white-default',
      },
      fontSize: {
        default: 'text-menu',
      },
    },
    defaultVariants: {
      buttonType: 'primary',
      fontSize: 'default',
    },
  },
);

interface IButton {
  isLoading?: boolean;
  disabled?: boolean;
}

interface IButtonProps
  extends VariantProps<typeof ButtonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement>,
    IButton {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({
  buttonType,
  fontSize,
  className,
  children,
  onClick,
  isLoading,
  disabled,
}: IButtonProps) {
  return (
    <button
      className={mergeClassNames(
        ButtonVariants({ buttonType, fontSize, className }),
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? '잠시만 기다려 주세요...' : children}
    </button>
  );
}
