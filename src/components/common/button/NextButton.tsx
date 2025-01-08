import Button from './Button';

interface INextButton {
  buttonText: string;
  disabled: boolean;
  className?: string;
  onClick: () => void;
}

export default function NextButton({
  buttonText,
  disabled,
  className,
  onClick,
}: INextButton) {
  return (
    <Button
      buttonType="primary"
      fontSize="default"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
