import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import IconOauthNaver from '@src/assets/icons/IconOauthNaver.svg?react';
import IconOauthGoogle from '@src/assets/icons/IconOauthGoogle.svg?react';
import { useForm } from 'react-hook-form';
import { ISignInRequest } from '@src/types/auth/SignInRequestType';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useSignInMutation } from '@src/state/mutations/auth/useSignInMutation';
import AuthButton from '@src/components/common/button/AuthButton';

export default function SignInPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm<ISignInRequest>();
  const isFormValid = watch('email') && watch('pw');
  const { mutate: signIn, isPending } = useSignInMutation();

  const onSubmit = (data: ISignInRequest) => {
    signIn(data);
    reset({ pw: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[7.5rem]">
      <h1 className="mb-6 text-title text-tertiary">싱크스팟 로그인</h1>
      <div className="flex items-center text-menu gap-[0.875rem] mb-11">
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
        <AuthButton
          buttonText="로그인"
          isLoading={isPending}
          disabled={!isFormValid}
        />
        <div className="flex justify-end text-gray-normal mt-[0.875rem] mb-[2.5rem]">
          <span
            onClick={() => navigate(PATH.HELP_ID_INQUIRY)}
            className="cursor-pointer"
          >
            아이디 찾기
          </span>
          <span className="mx-[0.5rem]">/</span>
          <span
            onClick={() => navigate(PATH.HELP_PASSWORD_INQUIRY)}
            className="cursor-pointer"
          >
            비밀번호 찾기
          </span>
        </div>
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
