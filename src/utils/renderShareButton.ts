import { PATH } from '@src/constants/path';
import { Location } from 'react-router-dom';

export function renderShareButton(
  selectedRoomId: string | null,
  isMobile: boolean,
  location: Location,
) {
  if (selectedRoomId === null) {
    return location.pathname === PATH.ABOUT;
  }

  const commonPaths = [
    PATH.LOCATION_RESULT(selectedRoomId),
    PATH.LOCATION_RECOMMENDATIONS(selectedRoomId),

    PATH.PLACE_RESULT(selectedRoomId),
    PATH.TIME_VOTE(selectedRoomId),
    PATH.TIME_RESULT(selectedRoomId),
    PATH.ABOUT,
  ];

  const validPaths = isMobile
    ? [
        PATH.LOCATION_ENTER(selectedRoomId),
        PATH.PLACE_VOTE(selectedRoomId),
        ...commonPaths,
      ]
    : commonPaths;

  const path = location.pathname;

  return validPaths.some((validPath) => path.includes(validPath));
}
