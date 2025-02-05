import { PATH } from '@src/constants/path';
import IconUser from '@src/assets/icons/IconUser.svg?react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@src/state/store/loginStore';

interface AuthButtonProps {
  onAuthClick: () => void;
}

export default function AuthButton({ onAuthClick }: AuthButtonProps) {
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();

  const authProps = {
    onClick: () => {
      onAuthClick();
      navigate(isLogin ? `${PATH.USERS}/${PATH.USERS_PROFILE}` : PATH.SIGN_IN);
    },
    className: isLogin
      ? 'p-2 hover:bg-gray-light rounded-[0.625rem]'
      : 'border-gray-normal border-login rounded-login px-3 py-[0.3125rem] hover:bg-primary hover:border-primary hover:text-white-default ml-1',
  };

  return (
    <li {...authProps}>
      {isLogin ? <IconUser className="size-6" /> : '로그인'}
    </li>
  );
}
