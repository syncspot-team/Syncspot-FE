import { API } from '@shared/constants';
import { IGetRoomDetailInfoResponseType } from '@shared/types/onboarding/getRoomDetailInfoResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getRoomDetailInfo = async (roomId: string) => {
  return getAPIResponseData<IGetRoomDetailInfoResponseType, void>({
    method: 'GET',
    url: API.ROOM_DETAIL_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
