import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { mergeClassNames } from '../../../utils/mergeClassNames';

export const ButtonVariants = cva(
  `
  flex items-center justify-center  
  w-[26.25rem] h-[3.4375rem] py-[1.125rem] px-[12.3125rem]
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
      },
      fontSize: {
        default: 'text-content lg:text-menu',
      },
    },
    defaultVariants: {
      buttonType: 'primary',
      fontSize: 'default',
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
