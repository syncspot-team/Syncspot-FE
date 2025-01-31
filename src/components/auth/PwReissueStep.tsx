import Button from '@src/components/common/button/Button';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';

interface PwReissueStepProps {
  tempPassword: string;
}

export default function PwReissueStep({ tempPassword }: PwReissueStepProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-[28.125rem] mt-5">
      <h3 className="ml-2 mb-[0.125rem] text-menu text-tertiary">
        임시 비밀번호
      </h3>
      <div className="flex-1 bg-gray-light rounded-default py-[1.125rem] pl-[0.9375rem] mb-6 overflow-x-auto scrollbar-hide">
        <span className="whitespace-nowrap">{tempPassword}</span>
      </div>
      <Button
        buttonType="primary"
        onClick={() => navigate(PATH.SIGN_IN)}
        className="w-full"
      >
        로그인
      </Button>
    </div>
  );
}
