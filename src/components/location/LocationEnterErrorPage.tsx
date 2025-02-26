import IconDolphin from '@src/assets/icons/IconDolphin.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';

export default function LocationEnterErrorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 items-center min-h-[calc(100vh-10rem)] lg:h-full">
      <IconDolphin className="mt-24 lg:mt-28 size-56 lg:size-80 animate-customBounce" />
      <div className="flex flex-col items-center gap-1 my-2 lg:my-4 lg:gap-2 text-menu text-gray-dark">
        <p>아직 입력한 장소가 없습니다.</p>
        <p>장소를 입력한 후 결과를 확인해주세요.</p>
      </div>
      <button
        onClick={() => navigate(PATH.LOCATION_ENTER(roomId!))}
        className="px-4 py-3 rounded-md lg:py-[1.125rem] lg:px-[6.3125rem] text-white-default bg-primary hover:bg-secondary"
      >
        장소 입력하러 가기
      </button>
    </div>
  );
}
