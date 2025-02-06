import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useForm } from 'react-hook-form';
import { useCreateRoomMutation } from '@src/state/mutations/onboarding/useCreateRoomMutation';
import { ICreateRoomRequest } from '@src/types/onboarding/createRoomRequestType';
import Button from '@src/components/common/button/Button';
import { Input } from '@src/components/common/input/Input';
import { useSaveUserToRoomMutation } from '@src/state/mutations/onboarding/useSaveUserToRoomMutation';

interface IOnBoardingCreateProps {
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void;
  setSelectedRoomId: (roomId: string) => void;
  setSelectedRoomName: (roomName: string) => void;
}

export default function OnBoardingCreate({
  setOnboardingStep,
  setSelectedRoomId,
  setSelectedRoomName,
}: IOnBoardingCreateProps) {
  const { register, handleSubmit, watch } = useForm<ICreateRoomRequest>();
  const isFormValid = watch('name');
  const { mutate: createRoom, isPending: isCreateRoomPending } =
    useCreateRoomMutation();
  const { mutate: saveUserToRoom, isPending: isSaveUserToRoomPending } =
    useSaveUserToRoomMutation();

  const handleCreateRoom = (createRoomPayload: ICreateRoomRequest) => {
    createRoom(createRoomPayload, {
      onSuccess: (data) => {
        const roomId = data.data.id;
        saveUserToRoom(
          { roomId },
          {
            onSuccess: () => {
              setSelectedRoomId(roomId);
              setSelectedRoomName(createRoomPayload.name);
              setOnboardingStep(
                OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP,
              );
            },
          },
        );
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-[10rem]">
      <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
        모임 생성하기
      </h1>
      <form onSubmit={handleSubmit(handleCreateRoom)} className="flex flex-col">
        <h3 className="text-menu text-tertiary mb-[0.625rem] ml-2">
          모임 이름
        </h3>
        <Input
          {...register('name')}
          placeholder="최대 8자까지 가능해요"
          className="mb-[1.75rem]"
        />
        <h3 className="text-menu text-tertiary mb-[0.625rem] ml-2">
          모임 설명 (선택)
        </h3>
        <Input
          {...register('memo')}
          placeholder="최대 100자까지 가능해요"
          className="mb-[2.375rem]"
        />
        <Button
          buttonType="primary"
          isLoading={isCreateRoomPending || isSaveUserToRoomPending}
          disabled={!isFormValid}
        >
          생성 완료
        </Button>
      </form>
    </div>
  );
}
