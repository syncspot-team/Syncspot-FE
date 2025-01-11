import Button from './Button';

interface ISearchButton {
  buttonText: string;
  isLoading: boolean;
  disabled: boolean;
  className?: string;
}

export default function SearchButton({
  buttonText,
  isLoading,
  disabled,
  className,
}: ISearchButton) {
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
