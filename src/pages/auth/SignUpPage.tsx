import { ISignUpFormValues } from '@src/types/auth/SignUpRequestType';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@src/components/common/input/Input';
import Button from '@src/components/common/button/Button';
import { useSignUpMutation } from '@src/state/mutations/auth/useSignUpMutation';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import { signupSchema } from '@src/types/auth/SignUpSchema';
import { SignUpDefaultValues } from '@src/components/auth/constants';
import { useEffect, useState } from 'react';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { useRequestEmailVerificationMutation } from '@src/state/mutations/auth/useRequestEmailVerificationMutation';
import { useConfirmEmailVerificationMutation } from '@src/state/mutations/auth/useConfirmEmailVerificationMutation';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    trigger,
    formState: { errors },
  } = useForm<ISignUpFormValues>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
    defaultValues: SignUpDefaultValues,
  });

  const password = watch('pw');
  const confirmPassword = watch('confirmPw');

  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPw');
    }
  }, [password, confirmPassword, trigger]);

  const { mutate: userSignup, isPending: isSignUpPending } =
    useSignUpMutation();
  const {
    mutate: requestEmailVerification,
    isPending: isRequestEmailVerificationPending,
  } = useRequestEmailVerificationMutation();
  const {
    mutate: confirmEmailVerification,
    isPending: isConfirmEmailVerificationPending,
  } = useConfirmEmailVerificationMutation();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const isFormValid =
    watch('email') &&
    watch('pw') &&
    watch('confirmPw') &&
    watch('name') &&
    isEmailVerified;

  const handleRequestEmailVerification = (e: React.MouseEvent) => {
    e.preventDefault();

    const email = watch('email');
    if (!email || errors.email) return;

    requestEmailVerification(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true);
        },
      },
    );
  };

  const handleConfirmEmailVerification = (e: React.MouseEvent) => {
    e.preventDefault();
    const code = watch('code');
    if (!code || errors.code) return;

    confirmEmailVerification(
      { email: watch('email'), code: watch('code') },
      {
        onSuccess: (data) => {
          if (data.data.isVerified) {
            setIsEmailVerified(true);
          } else {
            setError('code', {
              message: '인증번호가 올바르지 않습니다.',
            });
          }
        },
      },
    );
  };

  const handleSignUp = (data: ISignUpFormValues) => {
    if (!isEmailVerified) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이메일 인증을 먼저 진행해 주세요.',
      });
      return;
    }

    const { confirmPw, ...signUpPayload } = data;
    userSignup(signUpPayload);
  };

  const handleLocationSelect = (location: ISelectedLocation) => {
    const { place, address } = location;

    setValue('siDo', address?.address.region_1depth_name || '');
    setValue('siGunGu', address?.address.region_2depth_name || '');
    setValue('roadNameAddress', place?.place_name || '');
    setValue('addressLatitude', address?.y ? parseFloat(address.y) : 0);
    setValue('addressLongitude', address?.x ? parseFloat(address.x) : 0);
    setValue('existAddress', true);

    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[3.4375rem] px-6">
      <h1 className="mb-[1.875rem] text-title text-tertiary">
        싱크스팟 회원가입
      </h1>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const target = e.target as HTMLElement;
            if (target.closest('.address-search-container')) {
              e.preventDefault();
            }
          }
        }}
        className="flex flex-col items-center w-full"
      >
        <span className="ml-2 mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
          아이디 (이메일)
        </span>
        <div className="relative w-full max-w-[26.875rem]">
          <Input
            {...register('email')}
            type="email"
            placeholder="이메일을 입력해 주세요"
            className="pr-[6.25rem] w-full disabled:cursor-not-allowed"
            disabled={isEmailVerified}
          />
          <button
            type="button"
            onClick={handleRequestEmailVerification}
            disabled={isEmailVerified}
            className="absolute right-3 top-[1.875rem] -translate-y-1/2 h-[2.125rem] whitespace-nowrap text-description bg-gray-normal p-2 text-white-default rounded-md hover:enabled:bg-gray-dark cursor-pointer disabled:cursor-not-allowed"
          >
            {isRequestEmailVerificationPending
              ? '확인중...'
              : isEmailSent
                ? '재전송'
                : '인증코드 받기'}
          </button>
          {errors.email && (
            <p className="ml-2 text-description text-error-normal">
              {errors.email.message}
            </p>
          )}
        </div>

        {isEmailSent && (
          <>
            <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
              인증번호
            </span>
            <div className="relative w-full max-w-[26.875rem]">
              <Input
                {...register('code')}
                type="text"
                placeholder="인증번호 6자리를 입력해주세요"
                maxLength={6}
                disabled={isEmailVerified}
                className="pr-[6.25rem] w-full disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={handleConfirmEmailVerification}
                disabled={isEmailVerified}
                className="absolute right-3 top-[1.875rem] -translate-y-1/2 h-[2.125rem] whitespace-nowrap text-description bg-gray-normal p-2 text-white-default rounded-md hover:enabled:bg-gray-dark cursor-pointer disabled:cursor-not-allowed"
              >
                {isConfirmEmailVerificationPending
                  ? '확인중...'
                  : isEmailVerified
                    ? '인증 완료'
                    : '인증'}
              </button>
              {errors.code && (
                <p className="ml-2 text-description text-error-normal">
                  {errors.code.message}
                </p>
              )}
              {isEmailVerified && (
                <p className="ml-2 text-description text-blue-normal02">
                  인증이 완료되었습니다!
                </p>
              )}
            </div>
          </>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
          비밀번호
        </span>
        <Input
          {...register('pw')}
          type="password"
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
          }}
          autoComplete="off"
          maxLength={20}
          placeholder="영문 대/소문자, 숫자, 특수문자를 포함하여 주세요"
          className="w-full max-w-[26.875rem]"
        />
        {errors.pw && (
          <p className="ml-3 text-description text-error-normal w-full max-w-[26.875rem]">
            {errors.pw.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
          비밀번호 확인
        </span>
        <Input
          {...register('confirmPw')}
          type="password"
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
          }}
          autoComplete="off"
          placeholder="비밀번호 확인을 위해 다시 한 번 입력해 주세요"
          maxLength={20}
          className="w-full max-w-[26.875rem]"
        />
        {errors.confirmPw && (
          <p className="ml-3 text-description text-error-normal w-full max-w-[26.875rem]">
            {errors.confirmPw.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
          닉네임
        </span>
        <Input
          {...register('name')}
          type="text"
          placeholder="닉네임을 입력해주세요"
          maxLength={20}
          className="w-full max-w-[26.875rem]"
        />
        {errors.name && (
          <p className="ml-2 text-description text-error-normal w-full max-w-[26.875rem]">
            {errors.name.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary w-full max-w-[26.875rem]">
          내 주소 (선택)
        </span>
        <div className="w-full max-w-[26.875rem] address-search-container">
          <KakaoLocationPicker
            InputClassName="ring-1 ring-gray-normal bg-white-default"
            onSelect={handleLocationSelect}
            usePortal={false}
          />
        </div>
        <Button
          buttonType="primary"
          isLoading={isSignUpPending}
          disabled={!isFormValid}
          className="my-[1.75rem] w-full max-w-[26.875rem] px-5"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
