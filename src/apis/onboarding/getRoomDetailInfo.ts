import { API } from '@src/constants/api';
import { IGetRoomDetailInfoResponseType } from '@src/types/onboarding/getRoomDetailInfoResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getRoomDetailInfo = async (roomId: string) => {
  return getAPIResponseData<IGetRoomDetailInfoResponseType, void>({
    method: 'GET',
    url: API.ROOM_DETAIL_SEARCH(roomId),
  });
};
