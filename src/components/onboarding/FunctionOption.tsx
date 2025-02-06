import { ONBOARDING_FUNCTION_TYPE } from '@src/types/onboarding/onboardingFunctionType';

const FUNCTION_OPTIONS = [
  {
    type: ONBOARDING_FUNCTION_TYPE.FIND_MIDDLE_POINT,
    label: '중간 지점 찾기',
  },
  { type: ONBOARDING_FUNCTION_TYPE.VOTE_PLACE, label: '장소 투표' },
  { type: ONBOARDING_FUNCTION_TYPE.VOTE_TIME, label: '시간 투표' },
] as const;

interface IFunctionOptionProps {
  selectedFunction:
    | (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE]
    | null;
  setSelectedFunction: (
    type: (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE],
  ) => void;
}

export default function FunctionOption({
  selectedFunction,
  setSelectedFunction,
}: IFunctionOptionProps) {
  return (
    <>
      {FUNCTION_OPTIONS.map((option) => (
        <span
          key={option.type}
          onClick={() => setSelectedFunction(option.type)}
          className={`flex w-full text-content text-tertiary py-[1rem] px-[1.0625rem] rounded-default cursor-pointer ${
            selectedFunction === option.type
              ? 'ring-2 ring-blue-light02 bg-white-default'
              : 'bg-gray-light'
          }`}
        >
          {option.label}
        </span>
      ))}
    </>
  );
}
