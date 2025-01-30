import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import Button from '@src/components/common/button/Button';

interface IFormValues {
  email: string;
  verificationCode: string;
}

interface IVerificationCode {
  email: string;
  code: string;
}

export default function HelpPwInquiryPage() {
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
    // 이메일 유효성 검사
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }

    // 이메일 형식 검사
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

    // 이메일 유효성 검사
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }

    // 이메일 형식 검사
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

  const handleVerificationSubmit = async (data: IVerificationCode) => {
    if (!data.code) {
      setError('verificationCode', {
        type: 'required',
        message: '인증코드를 입력해주세요.',
      });
      return;
    }

    // 인증코드 검증 API 호출하는 과정 필요
    const isSuccess = true; // API 응답값으로 대체 필요

    if (isSuccess) {
      clearErrors('verificationCode');
      setIsVerified(true);
    } else {
      setError('verificationCode', {
        type: 'validate',
        message: '인증코드가 다릅니다.',
      });
    }
  };

  const handleTempPasswordRequest = async () => {
    // 임시 비밀번호 발급 API 호출하는 과정 필요
  };

  const renderVerificationMessage = () => {
    if (errors.verificationCode) {
      return (
        <p className="flex items-center justify-center mt-1 ml-2 text-description lg:text-content text-error-normal">
          {errors.verificationCode.message}
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
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[7.5rem] px-4 lg:px-[7.5rem]">
      <h1 className="mb-8 text-title text-tertiary">비밀번호 찾기</h1>
      <div className="flex flex-col w-full max-w-[28.125rem]">
        <h3 className="ml-2 mb-[0.125rem] text-menu text-tertiary">
          아이디 (이메일)
        </h3>
        <div className="flex gap-1">
          <Input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            placeholder="이메일을 입력해주세요"
            className="flex-1"
          />
          <button
            onClick={
              isEmailSent
                ? handleResendEmail
                : () => handleEmailSubmit(watch('email'))
            }
            disabled={!watch('email')}
            className="px-4 bg-primary hover:bg-secondary text-description lg:text-content text-white-default rounded-default disabled:bg-gray-normal disabled:cursor-not-allowed"
          >
            {isEmailSent ? '재전송' : '전송'}
          </button>
        </div>
        {errors.email && (
          <p className="mt-1 ml-2 text-description lg:text-content text-error-normal">
            {errors.email.message}
          </p>
        )}

        <h3 className="ml-2 mt-6 mb-[0.125rem] text-menu text-tertiary">
          인증코드
        </h3>
        <div className="flex gap-1">
          <Input
            {...register('verificationCode')}
            placeholder="이메일로 발송된 인증 코드를 입력해주세요"
            disabled={!isEmailSent}
            className="flex-1 disabled:cursor-not-allowed"
          />
          <button
            onClick={() =>
              handleVerificationSubmit({
                email: watch('email'),
                code: watch('verificationCode'),
              })
            }
            disabled={!isEmailSent}
            className="px-4 bg-primary hover:bg-secondary text-description lg:text-content text-white-default rounded-default disabled:bg-gray-normal disabled:cursor-not-allowed"
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
          className="w-full mt-10"
        >
          임시 비밀번호 발급
        </Button>
      </div>
    </div>
  );
}
