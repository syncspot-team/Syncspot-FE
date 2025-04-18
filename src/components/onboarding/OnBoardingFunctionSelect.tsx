import { useRoomStore } from '@src/state/store/roomStore';
import { useState } from 'react';
import { ONBOARDING_FUNCTION_TYPE } from '@src/types/onboarding/onboardingFunctionType';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import FunctionOption from './FunctionOption';
import Button from '@src/components/common/button/Button';

interface IOnBoardingFunctionSelectProps {
  selectedRoomId: string | null;
  selectedRoomName: string | null;
}

export default function OnBoardingFunctionSelect({
  selectedRoomId,
  selectedRoomName,
}: IOnBoardingFunctionSelectProps) {
  const navigate = useNavigate();
  const { setRoomId, setRoomName } = useRoomStore();
  const [selectedFunction, setSelectedFunction] = useState<
    | (typeof ONBOARDING_FUNCTION_TYPE)[keyof typeof ONBOARDING_FUNCTION_TYPE]
    | null
  >(null);

  const handleDoneClick = () => {
    if (!selectedFunction) return;
    setRoomId(selectedRoomId!);
    setRoomName(selectedRoomName!);

    switch (selectedFunction) {
      case ONBOARDING_FUNCTION_TYPE.FIND_MIDDLE_POINT:
        navigate(PATH.LOCATION_ENTER(selectedRoomId!));
        break;
      case ONBOARDING_FUNCTION_TYPE.VOTE_PLACE:
        navigate(PATH.PLACE_VOTE(selectedRoomId!));
        break;
      case ONBOARDING_FUNCTION_TYPE.VOTE_TIME:
        navigate(PATH.TIME_CREATE(selectedRoomId!));
        break;
    }
  };

  return (
    <div className="flex flex-col items-center mt-[6.25rem] lg:mt-[10.625rem]">
      <h1 className="text-subtitle text-tertiary mb-[1.875rem]">
        무엇을 할까요?
      </h1>
      <div className="flex flex-col items-center gap-[1.875rem] w-full max-w-[calc(100%-2rem)] lg:max-w-[26.875rem]">
        <FunctionOption
          selectedFunction={selectedFunction}
          setSelectedFunction={setSelectedFunction}
        />
        <Button
          buttonType="primary"
          disabled={!selectedFunction}
          onClick={handleDoneClick}
          className="w-full p-[1.875rem] lg:py-[1.125rem] lg:px-[11.3125rem]"
        >
          완료
        </Button>
      </div>
    </div>
  );
}
