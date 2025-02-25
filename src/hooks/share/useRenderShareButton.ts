import { useLocation } from 'react-router-dom';
import { PATH } from '@src/constants/path';

export function useRenderShareButton(
  selectedRoomId: string | null,
  isMobile: boolean,
) {
  const location = useLocation();

  const validPaths = isMobile
    ? [
        PATH.LOCATION_ENTER(selectedRoomId!),
        PATH.LOCATION_RESULT(selectedRoomId!),
        PATH.LOCATION_RECOMMENDATIONS(selectedRoomId!),
        PATH.PLACE_VOTE(selectedRoomId!),
        PATH.PLACE_RESULT(selectedRoomId!),
        PATH.TIME_VOTE(selectedRoomId!),
        PATH.TIME_RESULT(selectedRoomId!),
        PATH.ABOUT,
      ]
    : [
        PATH.LOCATION_RESULT(selectedRoomId!),
        PATH.LOCATION_RECOMMENDATIONS(selectedRoomId!),
        PATH.PLACE_RESULT(selectedRoomId!),
        PATH.TIME_VOTE(selectedRoomId!),
        PATH.TIME_RESULT(selectedRoomId!),
        PATH.ABOUT,
      ];

  const path = location.pathname;

  return validPaths.some((validPath) => path.includes(validPath));
}
