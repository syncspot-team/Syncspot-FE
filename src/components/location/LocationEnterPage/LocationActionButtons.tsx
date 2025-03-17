import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@src/components/common/button/Button';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import { PATH } from '@src/constants/path';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { useLocationContext } from '@src/components/location/LocationEnterPage/LocationContext';

interface LocationActionButtonsProps {
  className?: string;
}

export default function LocationActionButtons({
  className,
}: LocationActionButtonsProps) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAddLocation, isAllMyLocationsFilled } = useLocationContext();

  const handleFindMiddlePoint = () => {
    queryClient.invalidateQueries({
      queryKey: ROOM_QUERY_KEY.GET_CHECK_LOCATION_ENTER(roomId!),
    });
    navigate(PATH.LOCATION_RESULT(roomId!));
  };

  return (
    <div className={mergeClassNames('flex flex-col gap-[0.5rem]', className)}>
      <Button
        buttonType="secondary"
        onClick={handleAddLocation}
        className="px-[0.3125rem] w-full"
      >
        장소 추가하기
      </Button>
      <Button
        buttonType="primary"
        onClick={handleFindMiddlePoint}
        disabled={!isAllMyLocationsFilled}
        className="px-[0.3125rem] w-full"
      >
        중간 지점 찾기
      </Button>
    </div>
  );
}
