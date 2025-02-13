import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import Button from '@src/components/common/button/Button';
import { PwInquiryStepType } from '@src/types/auth/PwInquiryStepType';

interface IFormValues {
  email: string;
  code: string;
}

interface IPwInquiryStepProps {
  setPwInquiryStep: (step: keyof typeof PwInquiryStepType) => void;
  setTempPassword: (password: string) => void;
}

export default function PwInquiryStep({
  setPwInquiryStep,
  setTempPassword,
}: IPwInquiryStepProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleEmailSubmit = async (email: string) => {
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 형식이 아닙니다.',
      });
      return;
    }

    // 이메일 인증 API 호출하는 과정 필요
    clearErrors('email');
    setIsEmailSent(true);
  };

  const handleResendEmail = () => {
    const email = watch('email');

    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 형식이 아닙니다.',
      });
      return;
    }

    if (window.confirm('재전송하시겠습니까?')) {
      handleEmailSubmit(email);
    }
  };

  const handleVerificationSubmit = async (data: IFormValues) => {
    if (!data.code) {
      setError('code', {
        type: 'required',
        message: '인증코드를 입력해주세요.',
      });
      return;
    }

    // 인증코드 검증 API 호출하는 과정 필요
    const isSuccess = true; // API 응답값으로 대체 필요

    if (isSuccess) {
      clearErrors('code');
      setIsVerified(true);
    } else {
      setError('code', {
        type: 'validate',
        message: '인증코드가 다릅니다.',
      });
    }
  };

  const handleTempPasswordRequest = async () => {
    // 임시 비밀번호 발급 API 호출
    setTempPassword('123456'); // 부모 컴포넌트로 임시 비밀번호 전달
    setPwInquiryStep(PwInquiryStepType.PW_REISSUE_STEP);
  };

  const renderVerificationMessage = () => {
    if (errors.code) {
      return (
        <p className="flex items-center justify-center mt-1 ml-2 text-description lg:text-content text-error-normal">
          {errors.code.message}
        </p>
      );
    }

    if (isVerified) {
      return (
        <p className="flex items-center justify-center mt-1 ml-2 text-description lg:text-content text-blue-dark02">
          인증 코드가 확인되었습니다!
        </p>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col w-full max-w-[28.125rem]">
      <h3 className="ml-2 mb-[0.125rem] text-content lg:text-menu text-tertiary">
        아이디 (이메일)
      </h3>
      <div className="relative flex gap-1">
        <Input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          placeholder="이메일을 입력해주세요"
          className="w-full text-description"
        />
        <button
          onClick={
            isEmailSent
              ? handleResendEmail
              : () => handleEmailSubmit(watch('email'))
          }
          disabled={!watch('email')}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-[2.125rem] whitespace-nowrap text-description bg-gray-normal p-2 text-white-default rounded-md hover:enabled:bg-gray-dark cursor-pointer disabled:cursor-not-allowed"
        >
          {isEmailSent ? '재전송' : '인증코드 받기'}
        </button>
      </div>
      {errors.email && (
        <p className="mt-1 ml-2 text-description lg:text-content text-error-normal">
          {errors.email.message}
        </p>
      )}

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
      {renderVerificationMessage()}
      <Button
        buttonType="primary"
        onClick={handleTempPasswordRequest}
        isLoading={false}
        disabled={!isVerified}
        className="w-full px-5 mt-10"
      >
        임시 비밀번호 발급
      </Button>
    </div>
  );
}
