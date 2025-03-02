import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import { useShareKakao } from '@src/hooks/share/useKakaoShare';

import { SHARE_TYPE, ShareType } from '@src/types/shareType';
import { PATH } from '@src/constants/path';

export interface IShare {
  url: string;
}

export default function KakaoShare({ url }: IShare) {
  const selectedRoomId = localStorage.getItem('selectedRoomId');

  if (selectedRoomId === null) {
    return false;
  }

  const pathToShareTypeMap: Record<string, ShareType> = {
    [PATH.LOCATION_ENTER(selectedRoomId)]: SHARE_TYPE.LOCATION_ENTER,
    [PATH.LOCATION_RESULT(selectedRoomId)]: SHARE_TYPE.LOCATION_RESULT,
    [PATH.LOCATION_RECOMMENDATIONS(selectedRoomId)]:
      SHARE_TYPE.LOCATION_RECOMMENDATIONS,
    [PATH.PLACE_CREATE(selectedRoomId)]: SHARE_TYPE.PLACE_CREATE,
    [PATH.PLACE_VOTE(selectedRoomId)]: SHARE_TYPE.PLACE_VOTE,
    [PATH.PLACE_RESULT(selectedRoomId)]: SHARE_TYPE.PLACE_RESULT,
    [PATH.TIME_CREATE(selectedRoomId)]: SHARE_TYPE.TIME_CREATE,
    [PATH.TIME_VOTE(selectedRoomId)]: SHARE_TYPE.TIME_VOTE,
    [PATH.TIME_RESULT(selectedRoomId)]: SHARE_TYPE.TIME_RESULT,
    [PATH.ABOUT]: SHARE_TYPE.ABOUT,
  };

  const handleKakaoShare = () => {
    const descriptionType = pathToShareTypeMap[window.location.pathname];
    if (descriptionType) {
      useShareKakao({ descriptionType, url });
    } else {
      console.error('매칭되는 SHARE_TYPE이 없습니다.');
    }
  };
  return (
    <button
      className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light"
      onClick={handleKakaoShare}
    >
      <IconOauthKakao className="size-6" />
      <span>카카오톡</span>
    </button>
  );
}
