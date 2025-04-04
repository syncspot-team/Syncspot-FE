import { useState } from 'react';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import OnBoardingCreate from '@src/components/onboarding/OnBoardingCreate';
import OnBoardingPlan from '@src/components/onboarding/OnBoardingPlan';
import OnBoardingFunctionSelect from '@src/components/onboarding/OnBoardingFunctionSelect';
import { useLocation } from 'react-router-dom';
import { useFunnel } from '@src/hooks/useFunnel';

export default function OnBoardingPage() {
  const location = useLocation();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null);

  const initialStep =
    (location.state?.initialStep as keyof typeof OnboardingStepType) ||
    OnboardingStepType.ONBOARDING_PLAN_STEP;

  const { Funnel, changeStep } =
    useFunnel<keyof typeof OnboardingStepType>(initialStep);

  return (
    <Funnel>
      <Funnel.Step step={OnboardingStepType.ONBOARDING_PLAN_STEP}>
        <OnBoardingPlan
          setOnboardingStep={changeStep}
          setSelectedRoomId={setSelectedRoomId}
          setSelectedRoomName={setSelectedRoomName}
        />
      </Funnel.Step>

      <Funnel.Step step={OnboardingStepType.ONBOARDING_CREATE_STEP}>
        <OnBoardingCreate
          setOnboardingStep={changeStep}
          setSelectedRoomId={setSelectedRoomId}
          setSelectedRoomName={setSelectedRoomName}
        />
      </Funnel.Step>

      <Funnel.Step step={OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP}>
        <OnBoardingFunctionSelect
          selectedRoomId={selectedRoomId}
          selectedRoomName={selectedRoomName}
        />
      </Funnel.Step>
    </Funnel>
  );
}
