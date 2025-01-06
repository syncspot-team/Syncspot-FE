import Button from '../Button';

interface ISignInButton {
  isLoading: boolean;
  disabled: boolean;
}

export default function SignInButton({ isLoading, disabled }: ISignInButton) {
  return (
    <Button
      type="submit"
      buttonType="primary"
      fontSize="default"
      isLoading={isLoading}
      disabled={disabled}
    >
      로그인
    </Button>
  );
}
