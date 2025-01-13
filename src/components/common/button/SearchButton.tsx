import Button from './Button';

interface ISearchButton {
  buttonText: string;
  disabled: boolean;
  className?: string;
  onClick: () => void;
}

export default function SearchButton({
  buttonText,
  disabled,
  className,
  onClick,
}: ISearchButton) {
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
