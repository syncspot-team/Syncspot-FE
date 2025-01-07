import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { mergeClassNames } from '../../../utils/mergeClassNames';

export const ButtonVariants = cva(
  `
  flex items-center justify-center   
  disabled:cursor-not-allowed
  disabled:bg-disabled
  disabled:border-disabled
  disabled:text-white-default
  `,
  {
    variants: {
      buttonType: {
        primary:
          'w-full h-[3.75rem] bg-primary border border-primary  rounded-default py-[1.125rem] px-[12.3125rem] hover:bg-secondary text-white-default',
        add: 'w-full h-[3.75rem] bg-white-default border border-gray-normal rounded-default py-[1.125rem] px-[12.3125rem] hover:bg-gray-light text-gray-normal hover:text-gray-dark',
      },
      fontSize: {
        default: 'text-menu-selected',
        small: 'text-menu',
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
