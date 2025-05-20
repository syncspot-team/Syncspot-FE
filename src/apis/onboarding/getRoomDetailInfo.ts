import { API } from '@src/shared/constants';
import { IGetRoomDetailInfoResponseType } from '@src/shared/types/onboarding/getRoomDetailInfoResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getRoomDetailInfo = async (roomId: string) => {
  return getAPIResponseData<IGetRoomDetailInfoResponseType, void>({
    method: 'GET',
    url: API.ROOM_DETAIL_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
