import Button from './Button';

interface IAuthButton {
  buttonText: string;
  isLoading: boolean;
  disabled: boolean;
  className?: string;
}

export default function AuthButton({
  buttonText,
  isLoading,
  disabled,
  className,
}: IAuthButton) {
  return (
    <Button
      buttonType="primary"
      fontSize="default"
      isLoading={isLoading}
      disabled={disabled}
      className={className}
    >
      {buttonText}
    </Button>
  );
}
