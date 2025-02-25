import IconShare from '@src/assets/icons/IconShare.svg?react';

interface IShareButtonProps {
  onShareClick: () => void;
}

export default function ShareButton({ onShareClick }: IShareButtonProps) {
  const handleClick = () => {
    onShareClick();
  };

  return (
    <li
      onClick={handleClick}
      className="rounded-full cursor-pointer p-[5px] shadow-black filter hover:bg-blue-light01"
    >
      <IconShare className="size-4" />
    </li>
  );
}
