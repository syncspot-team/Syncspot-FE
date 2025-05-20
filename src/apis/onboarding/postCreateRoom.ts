import { API } from '@src/shared/constants';
import { ICreateRoomRequest } from '@src/shared/types/onboarding/createRoomRequestType';
import { ICreateRoomResponse } from '@src/shared/types/onboarding/createRoomResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const postCreateRoom = async (createRoomPayload: ICreateRoomRequest) => {
  return getAPIResponseData<ICreateRoomResponse, ICreateRoomRequest>({
    method: 'POST',
    url: API.ROOM_CREATE,
    data: createRoomPayload,
  });
};
