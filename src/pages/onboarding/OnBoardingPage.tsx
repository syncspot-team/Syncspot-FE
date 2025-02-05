import { useState, useEffect } from 'react';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import OnBoardingCreate from '@src/components/onboarding/OnBoardingCreate';
import OnBoardingPlan from '@src/components/onboarding/OnBoardingPlan';
import OnBoardingFunctionSelect from '@src/components/onboarding/OnBoardingFunctionSelect';
import { PATH } from '@src/constants/path';
import { useLocation } from 'react-router-dom';

export default function OnBoardingPage() {
  const location = useLocation();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<
    keyof typeof OnboardingStepType
  >(
    (location.state?.initialStep as keyof typeof OnboardingStepType) ||
      OnboardingStepType.ONBOARDING_PLAN_STEP,
  );

  // 온보딩 단계 변경을 처리하는 새로운 함수
  const handleStepChange = (newStep: keyof typeof OnboardingStepType) => {
    // 현재 단계를 history에 추가
    const currentState = {
      onboardingStep: newStep,
      previousStep: onboardingStep,
    };

    // 현재 history stack의 마지막 상태를 교체
    window.history.replaceState(
      {
        onboardingStep,
        previousStep: window.history.state?.previousStep,
      },
      '',
      PATH.ONBOARDING,
    );

    // 새로운 상태를 push
    window.history.pushState(currentState, '', PATH.ONBOARDING);
    setOnboardingStep(newStep);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state === null) {
        // 히스토리의 첫 페이지인 경우
        window.location.href = PATH.ROOT;
        return;
      }

      // 이전 단계로 돌아감
      setOnboardingStep(event.state.onboardingStep);
    };

    window.addEventListener('popstate', handlePopState);

    // 초기 진입 시 현재 상태를 history에 추가
    if (window.history.state === null) {
      window.history.replaceState(
        {
          onboardingStep,
          previousStep: null,
        },
        '',
        PATH.ONBOARDING,
      );
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onboardingStep]);

  return (
    <>
      {onboardingStep === OnboardingStepType.ONBOARDING_PLAN_STEP && (
        <OnBoardingPlan
          setOnboardingStep={handleStepChange}
          setSelectedRoomId={setSelectedRoomId}
          setSelectedRoomName={setSelectedRoomName}
        />
      )}
      {onboardingStep === OnboardingStepType.ONBOARDING_CREATE_STEP && (
        <OnBoardingCreate
          setOnboardingStep={handleStepChange}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}
      {onboardingStep ===
        OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP && (
        <OnBoardingFunctionSelect
          selectedRoomId={selectedRoomId}
          selectedRoomName={selectedRoomName}
        />
      )}
    </>
  );
}
