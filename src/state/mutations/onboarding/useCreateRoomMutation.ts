import { postCreateRoom } from '@src/apis/onboarding/postCreateRoon';
import { ICreateRoomRequest } from '@src/types/onboarding/createRoomRequestType';
import { ICreateRoomResponse } from '@src/types/onboarding/createRoomResponseType';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useCreateRoomMutation = (
  setFormLoading: (loading: boolean) => void,
  setSelectedRoomId: (id: string) => void,
  setOnboardingStep: (step: keyof typeof OnboardingStepType) => void,
  options?: UseMutationOptions<ICreateRoomResponse, Error, ICreateRoomRequest>,
) => {
  return useMutation({
    mutationFn: postCreateRoom,
    onSuccess: (data) => {
      setSelectedRoomId(data.data.id);
      setOnboardingStep(OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP);
    },
    onSettled: () => {
      setFormLoading(false);
    },
    ...options,
  });
};
