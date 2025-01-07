import Button from './Button';

interface IAddButton {
  buttonText: string;
  className?: string;
  onClick: () => void;
}

export default function AddButton({
  buttonText,
  className,
  onClick,
}: IAddButton) {
  return (
    <Button
      buttonType="add"
      fontSize="small"
      className={className}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
