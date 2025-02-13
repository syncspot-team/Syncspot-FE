import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import { PwInquiryStepType } from '@src/types/auth/PwInquiryStepType';
import { usePwReissueMutation } from '@src/state/mutations/auth/usePwReissueMutation';
import { usePwReissueEmailVerificationMutation } from '@src/state/mutations/auth/usePwReissueEmailVerificationMutation';

interface IFormValues {
  email: string;
  code: string;
}

interface IPwInquiryStepProps {
  setPwInquiryStep: (step: keyof typeof PwInquiryStepType) => void;
}

export default function PwInquiryStep({
  setPwInquiryStep,
}: IPwInquiryStepProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { mutate: requestEmailVerification } =
    usePwReissueEmailVerificationMutation();
  const { mutate: reissue } = usePwReissueMutation();

  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>();

  return (
    <div className="flex flex-col w-full max-w-[28.125rem]">
      <h3 className="ml-2 mb-[0.125rem] text-content lg:text-menu text-tertiary">
        아이디 (이메일)
      </h3>
      <div className="relative flex gap-1">
        <Input
          {...register('email')}
          placeholder="이메일을 입력해주세요"
          className="w-full text-description"
        />
        <button
          onClick={isEmailSent ? handleResendEmail : handleEmailSubmit}
          disabled={!watch('email')}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-[2.125rem] whitespace-nowrap text-description bg-gray-normal p-2 text-white-default rounded-md hover:enabled:bg-gray-dark cursor-pointer disabled:cursor-not-allowed"
        >
          {isEmailSent ? '재전송' : '인증코드 받기'}
        </button>
      </div>
      {errors.email && (
        <p className="mt-3 text-center text-description text-error-normal">
          {errors.email.message}
        </p>
      )}

      {isEmailSent && (
        <>
          <h3 className="ml-2 mt-6 mb-[0.125rem] text-content lg:text-menu text-tertiary">
            인증코드
          </h3>
          <div className="relative flex gap-1">
            <Input
              {...register('code')}
              placeholder="이메일로 발송된 인증 코드를 입력해주세요"
              disabled={!isEmailSent}
              className="w-full disabled:cursor-not-allowed text-description"
            />
            <button
              onClick={() =>
                handleVerificationSubmit({
                  email: watch('email'),
                  code: watch('code'),
                })
              }
              disabled={!isEmailSent}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-[2.125rem] whitespace-nowrap text-description bg-gray-normal p-2 text-white-default rounded-md hover:enabled:bg-gray-dark cursor-pointer disabled:cursor-not-allowed"
            >
              확인
            </button>
          </div>
          {errors.code && (
            <p className="mt-3 text-center text-description text-error-normal">
              {errors.code.message}
            </p>
          )}
        </>
      )}
    </div>
  );

  function validateEmail(email: string) {
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return false;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 형식이 아닙니다.',
      });
      return false;
    }

    return true;
  }

  function handleEmailSubmit() {
    const email = watch('email');
    if (!validateEmail(email)) return;
    clearErrors('email');

    requestEmailVerification(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true);
        },
      },
    );
  }

  function handleResendEmail() {
    const email = watch('email');
    if (!validateEmail(email)) return;
    clearErrors('email');

    if (window.confirm('재전송하시겠습니까?')) {
      handleEmailSubmit();
    }
  }

  function handleVerificationSubmit(data: IFormValues) {
    if (!data.code) {
      setError('code', {
        type: 'required',
        message: '인증코드를 입력해주세요.',
      });
      return;
    }

    clearErrors('code');

    reissue(
      { email: data.email, code: data.code },
      {
        onSuccess: () => {
          setPwInquiryStep(PwInquiryStepType.PW_REISSUE_STEP);
        },
        onError: () => {
          setError('code', {
            type: 'validate',
            message: '인증코드가 다릅니다.',
          });
        },
      },
    );
  }
}
