import { API } from '@src/shared/constants';
import { IJoinRoomResponse } from '@src/shared/types/header/joinRoomResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getJoinRoom = async () => {
  return getAPIResponseData<IJoinRoomResponse, void>({
    method: 'GET',
    url: API.JOINED_ROOMS_SEARCH,
  });
};
