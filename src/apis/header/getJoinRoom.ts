import { API } from '@shared/constants';
import { IJoinRoomResponse } from '@shared/types/header/joinRoomResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getJoinRoom = async () => {
  return getAPIResponseData<IJoinRoomResponse, void>({
    method: 'GET',
    url: API.JOINED_ROOMS_SEARCH,
  });
};
