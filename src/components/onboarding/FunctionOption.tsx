import { ONBOARDING_FUNCTION_TYPE } from '@src/types/onboarding/onboardingFunctionType';

interface IFunctionOptionProps {
  type: (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE];
  label: string;
  selectedFunction:
    | (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE]
    | null;
  onClick: (
    type: (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE],
  ) => void;
}

export default function FunctionOption({
  type,
  label,
  selectedFunction,
  onClick,
}: IFunctionOptionProps) {
  return (
    <span
      onClick={() => onClick(type)}
      className={`flex w-full text-content text-tertiary py-[1rem] px-[1.0625rem] rounded-default cursor-pointer ${
        selectedFunction === type
          ? 'ring-2 ring-blue-light02 bg-white-default'
          : 'bg-gray-light'
      }`}
    >
      {label}
    </span>
  );
}
