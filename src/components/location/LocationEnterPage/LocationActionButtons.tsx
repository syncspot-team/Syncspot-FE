import Button from '@src/components/common/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { PATH } from '@src/constants/path';
import { mergeClassNames } from '@src/utils/mergeClassNames';

interface LocationActionButtonsProps {
  className?: string;
  isAllMyLocationsFilled: boolean;
  onAddLocation: () => void;
}

export default function LocationActionButtons({
  isAllMyLocationsFilled,
  onAddLocation,
  className,
}: LocationActionButtonsProps) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        onClick={onAddLocation}
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
