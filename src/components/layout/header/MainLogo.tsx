import IconMainLogo from '@src/assets/icons/IconMainLogo.svg?react';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';

export default function MainLogo() {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(PATH.ROOT)}
      className="flex items-center gap-[0.3125rem] cursor-pointer"
    >
      <div className="flex items-center gap-[0.3125rem]">
        <IconMainLogo className="size-[1.5rem] lg:size-[2rem]" />
        <span className="-mt-2 text-title lg:text-logo text-tertiary">
          syncspot
        </span>
      </div>
    </li>
  );
}
