import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { PATH } from '@src/constants/path';

export interface FunnelProps<T> {
  children: Array<ReactElement<StepProps<T>>>;
}

interface StepProps<T> {
  children: ReactNode;
  step: T;
}

export function useFunnel<T>(defaultStep: T) {
  const [step, setStep] = useState<T>(defaultStep);

  // 단계 변경을 처리하는 함수
  function changeStep(newStep: T) {
    // 현재 단계를 history에 추가
    const currentState = {
      onboardingStep: newStep,
      previousStep: step,
    };

    // 현재 history stack의 마지막 상태를 교체
    window.history.replaceState(
      {
        onboardingStep: step,
        previousStep: window.history.state?.previousStep,
      },
      '',
      PATH.ONBOARDING,
    );

    // 새로운 상태를 push
    window.history.pushState(currentState, '', PATH.ONBOARDING);
    setStep(newStep);
  }

  // popstate 이벤트 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state === null) {
        window.location.href = PATH.ROOT;
        return;
      }
      setStep(event.state.onboardingStep);
    };

    window.addEventListener('popstate', handlePopState);

    // 초기 진입 시 현재 상태를 history에 추가
    if (window.history.state === null) {
      window.history.replaceState(
        {
          onboardingStep: step,
          previousStep: null,
        },
        '',
        PATH.ONBOARDING,
      );
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [step]);

  // Step 컴포넌트
  function Step({ children }: StepProps<T>): ReactElement {
    return <>{children}</>;
  }

  function Funnel({ children }: FunnelProps<T>) {
    const currentStepElement = children.find(
      (child) => child.props.step === step,
    );

    return <>{currentStepElement}</>;
  }

  Funnel.Step = Step;

  return {
    Funnel,
    currentStep: step,
    changeStep,
  } as const;
}
