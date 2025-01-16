import { API } from '@src/constants/api';
import { IJoinRoomResponse } from '@src/types/header/joinRoomResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getJoinRoom = () => {
  return getAPIResponseData<IJoinRoomResponse, void>({
    method: 'GET',
    url: API.JOINED_ROOMS_SEARCH,
  });
};
