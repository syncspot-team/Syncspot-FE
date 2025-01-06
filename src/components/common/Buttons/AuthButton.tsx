import Button from '@src/components/common/buttons/Button';

interface IAuthButton {
  buttonText: string;
  isLoading: boolean;
  disabled: boolean;
}

export default function AuthButton({
  buttonText,
  isLoading,
  disabled,
}: IAuthButton) {
  return (
    <Button
      buttonType="primary"
      fontSize="default"
      isLoading={isLoading}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
}
