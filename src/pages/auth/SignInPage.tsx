import IconAntenna from '@src/assets/icons/IconAntenna.svg?react';
import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import IconOauthNaver from '@src/assets/icons/IconOauthNaver.svg?react';
import IconOauthGoogle from '@src/assets/icons/IconOauthGoogle.svg?react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ISignInRequest } from '@src/types/auth/SignInRequestType';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useSignInMutation } from '@src/state/mutations/auth/useSignInMutation';
import AuthButton from '@src/components/common/button/AuthButton';

export default function SignInPage() {
  const navigate = useNavigate();
  const [, setFormLoading] = useState(false);
  const { register, handleSubmit } = useForm<ISignInRequest>();
  // const isFormValid = watch('email') && watch('pw');
  const { mutate: signIn } = useSignInMutation();

  const onSubmit = (data: ISignInRequest) => {
    setFormLoading(true);
    signIn(data);
    setFormLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[5.625rem]">
      <div className="mb-5">
        <IconAntenna />
      </div>
      <h1 className="mb-6 text-title text-tertiary">싱크스팟 로그인</h1>
      <div className="flex items-center text-subtitle gap-[0.875rem] mb-11">
        <span className="text-gray-dark">아직 계정이 없으신가요?</span>
        <span
          onClick={() => navigate(PATH.SIGN_UP)}
          className="cursor-pointer text-primary"
        >
          회원가입하기
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          {...register('email')}
          type="text"
          placeholder="아이디 (이메일)"
          className="placeholder:text-gray-normal bg-gray-light py-[1.3125rem] px-[1.5rem] rounded-default mb-[0.875rem]"
        />
        <input
          {...register('pw')}
          type="password"
          placeholder="비밀번호 (영문 대/소문자, 숫자, 특수문자 포함)"
          className="placeholder:text-gray-normal bg-gray-light  py-[1.3125rem] px-[1.5rem] rounded-default mb-5"
        />
        <AuthButton buttonText="로그인" isLoading={false} disabled={false} />
        <span className="flex justify-end text-gray-normal mt-[0.875rem] mb-[2.5rem]">
          아이디/비밀번호 찾기
        </span>
      </form>
      <div className="flex items-center gap-[1.25rem] cursor-pointer">
        <span className="hover:translate-y-[-0.25rem]">
          <IconOauthKakao />
        </span>
        <span className="hover:translate-y-[-0.25rem]">
          <IconOauthNaver />
        </span>
        <span className="hover:translate-y-[-0.25rem]">
          <IconOauthGoogle />
        </span>
      </div>
    </div>
  );
}
