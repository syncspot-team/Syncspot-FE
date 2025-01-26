import { useState, useEffect } from 'react';
import { OnboardingStepType } from '@src/types/onboarding/onboardingStepType';
import OnBoardingCreate from '@src/components/onboarding/OnBoardingCreate';
import OnBoardingPlan from '@src/components/onboarding/OnBoardingPlan';
import OnBoardingFunctionSelect from '@src/components/onboarding/OnBoardingFunctionSelect';
import { PATH } from '@src/constants/path';

export default function OnBoardingPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // 선택한 모임 정보
  const [onboardingStep, setOnboardingStep] = useState<
    keyof typeof OnboardingStepType
  >(OnboardingStepType.ONBOARDING_PLAN_STEP); // 온보딩 단계

  // getQueryData를 통해 RoomList에서 useGetJoinRoomQuery로 불러온 데이터 값을 받아와서 OnBoardingPlan 컴포넌트에 데이터를 전달해야한다

  useEffect(() => {
    // 초기 진입 시에는 pushState를 하지 않음
    const handlePopState = (event: PopStateEvent) => {
      if (event.state === null) {
        // 히스토리 스택이 비어있거나 랜딩 페이지로 돌아가는 경우
        window.location.href = PATH.ROOT; // 랜딩 페이지로 리다이렉트
        return;
      }

      if (event.state) {
        setOnboardingStep(event.state.onboardingStep);
      } else {
        setOnboardingStep(OnboardingStepType.ONBOARDING_PLAN_STEP);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // replaceState를 사용하여 현재 상태를 교체 (새로운 히스토리 항목을 추가하지 않음)
    window.history.replaceState({ onboardingStep }, '', PATH.ONBOARDING);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onboardingStep]);

  return (
    <>
      {onboardingStep === OnboardingStepType.ONBOARDING_PLAN_STEP && (
        <OnBoardingPlan
          setOnboardingStep={setOnboardingStep}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}
      {onboardingStep === OnboardingStepType.ONBOARDING_CREATE_STEP && (
        <OnBoardingCreate
          setOnboardingStep={setOnboardingStep}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}
      {onboardingStep ===
        OnboardingStepType.ONBOARDING_FUNCTION_SELECT_STEP && (
        <OnBoardingFunctionSelect selectedRoomId={selectedRoomId} />
      )}
    </>
  );
}
