import { PATH } from '@src/constants/path';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@src/state/store/loginStore';

interface IAuthButtonProps {
  onAuthClick: () => void;
  isMobile: boolean;
}

export default function AuthButton({
  onAuthClick,
  isMobile,
}: IAuthButtonProps) {
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();

  const handleClick = () => {
    onAuthClick();
    navigate(isLogin ? `${PATH.USERS}/${PATH.USERS_PROFILE}` : PATH.SIGN_IN);
  };

  const authButtonClassName = isMobile
    ? 'cursor-pointer hover:bg-gray-light px-4 py-3'
    : isLogin
      ? 'p-2 hover:bg-gray-light rounded-[0.625rem]'
      : 'border-gray-normal border-login rounded-login px-3 py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default ml-1';

  const authButtonContent = isMobile ? (
    isLogin ? (
      '마이페이지'
    ) : (
      '로그인'
    )
  ) : isLogin ? (
    <IconUser className="size-6" />
  ) : (
    '로그인'
  );

  return (
    <li onClick={handleClick} className={authButtonClassName}>
      {authButtonContent}
    </li>
  );
}
