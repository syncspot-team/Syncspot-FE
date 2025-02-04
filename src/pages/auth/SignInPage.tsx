import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import IconOauthNaver from '@src/assets/icons/IconOauthNaver.svg?react';
import IconOauthGoogle from '@src/assets/icons/IconOauthGoogle.svg?react';
import { useForm } from 'react-hook-form';
import { ISignInRequest } from '@src/types/auth/SignInRequestType';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useSignInMutation } from '@src/state/mutations/auth/useSignInMutation';
import Button from '@src/components/common/button/Button';
import { Input } from '@src/components/common/input/Input';

export default function SignInPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm<ISignInRequest>();
  const isFormValid = watch('email') && watch('pw');
  const { mutate: signIn, isPending: isSignInPending } = useSignInMutation();

  const handleSignIn = (signInPayload: ISignInRequest) => {
    signIn(signInPayload);
    reset({ pw: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[8.75rem] px-4">
      <h1 className="mb-6 text-title text-tertiary">싱크스팟 로그인</h1>
      <div className="flex items-center text-menu gap-[0.875rem] mb-6">
        <span className="text-gray-dark text-content lg:text-menu">
          아직 계정이 없으신가요?
        </span>
        <span
          onClick={() => navigate(PATH.SIGN_UP)}
          className="underline cursor-pointer lg:no-underline hover:underline text-primary text-content lg:text-menu"
        >
          회원가입하기
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col items-center w-full"
      >
        <Input
          {...register('email')}
          type="text"
          placeholder="아이디 (이메일)"
          className="mb-[0.875rem] w-full max-w-[26.875rem]"
        />
        <Input
          {...register('pw')}
          type="password"
          placeholder="비밀번호 (영문 대/소문자, 숫자, 특수문자 포함)"
          className="mb-5 w-full max-w-[26.875rem]"
        />
        <Button
          buttonType="primary"
          isLoading={isSignInPending}
          disabled={!isFormValid}
          className="w-full max-w-[26.875rem] px-5"
        >
          로그인
        </Button>
        <div className="flex justify-end text-gray-normal mt-[0.875rem] mb-[2.5rem] w-full max-w-[26.875rem]">
          <span
            onClick={() => navigate(PATH.HELP_PASSWORD_INQUIRY)}
            className="underline cursor-pointer hover:underline lg:no-underline"
          >
            비밀번호를 잊으셨나요?
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
