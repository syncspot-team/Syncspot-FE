import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useForm } from 'react-hook-form';
import AuthButton from '../common/button/AuthButton';
import { useState } from 'react';
import { useCreateRoomMutation } from '@src/state/mutations/onboarding/useCreateRoomMutation';
import { ICreateRoomRequest } from '@src/types/onboarding/createRoomRequestType';

interface IOnBoardingCreateProps {
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void;
  setSelectedRoomId: (roomId: string) => void;
}

export default function OnBoardingCreate({
  setOnboardingStep,
  setSelectedRoomId,
}: IOnBoardingCreateProps) {
  const { register, handleSubmit, watch } = useForm<ICreateRoomRequest>();
  const [formLoading, setFormLoading] = useState(false);
  const isFormValid = watch('name');
  const { mutate: createRoom } = useCreateRoomMutation(
    setFormLoading,
    setSelectedRoomId,
    setOnboardingStep,
  );

  const onSubmit = (data: ICreateRoomRequest) => {
    setFormLoading(true);
    createRoom(data);
  };

  return (
    <div className="flex flex-col items-center mt-[7.5rem]">
      <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
        모임 생성하기
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h3 className="text-menu text-tertiary mb-[0.875rem] ml-2">
          모임 이름
        </h3>
        <input
          {...register('name')}
          placeholder="최대 8자까지 가능해요"
          className="placeholder:text-gray-normal bg-gray-light py-[1.3125rem] px-[1.5rem] rounded-default mb-[1.75rem]"
        />
        <h3 className="text-menu text-tertiary mb-[0.875rem] ml-2">
          모임 설명 (선택)
        </h3>
        <input
          {...register('roomDescription')}
          placeholder="최대 100자까지 가능해요"
          className="placeholder:text-gray-normal bg-gray-light py-[1.3125rem] px-[1.5rem] rounded-default mb-[2.375rem]"
        />
        <AuthButton
          buttonText="생성 완료"
          isLoading={formLoading}
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
}
