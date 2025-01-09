import { API } from '@src/constants/api';
import { ICreateRoomRequest } from '@src/types/onboarding/createRoomRequestType';
import { ICreateRoomResponse } from '@src/types/onboarding/createRoomResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postCreateRoom = async (createRoomPayload: ICreateRoomRequest) => {
  return getAPIResponseData<ICreateRoomResponse, ICreateRoomRequest>({
    method: 'POST',
    url: API.ROOM_CREATE,
    data: createRoomPayload,
  });
};
