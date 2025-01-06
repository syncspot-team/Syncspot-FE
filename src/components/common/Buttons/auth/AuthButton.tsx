import Button from '../Button';

interface IAuthButton {
  text: string;
  isLoading: boolean;
  disabled: boolean;
}

export default function AuthButton({ isLoading, disabled, text }: IAuthButton) {
  return (
    <Button
      type="submit"
      buttonType="primary"
      fontSize="default"
      isLoading={isLoading}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
