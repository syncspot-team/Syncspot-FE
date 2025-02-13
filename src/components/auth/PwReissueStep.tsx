import Button from '@src/components/common/button/Button';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';
import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';

export default function PwReissueStep() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-[28.125rem] items-center">
      <IconDolphin className="my-4 size-64 animate-customBounce" />
      <span className="text-center text-content lg:text-menu text-gray-dark">
        입력하신 이메일로 임시 비밀번호가 전송되었어요!
      </span>
      <p className="my-3 mb-5 text-center text-description lg:text-content text-gray-dark">
        발급된 임시 비밀번호는 마이페이지에서 변경할 수 있어요!
      </p>
      <Button
        buttonType="primary"
        onClick={() => navigate(PATH.SIGN_IN)}
        className="w-full"
      >
        로그인 하러 가기
      </Button>
    </div>
  );
}
