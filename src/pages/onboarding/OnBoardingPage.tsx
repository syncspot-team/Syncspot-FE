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
    // 현재 상태를 히스토리 스택에 추가
    window.history.pushState({ onboardingStep }, '', PATH.ONBOARDING);

    // popstate 이벤트 핸들러
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        // 이전 상태로 복원
        setOnboardingStep(event.state.onboardingStep);
      } else {
        // 히스토리 스택에 상태가 없는 경우 초기 상태로
        setOnboardingStep(OnboardingStepType.ONBOARDING_PLAN_STEP);
      }
    };

    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
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
