import { API } from '@shared/constants';
import { ICreateRoomRequest } from '@shared/types/onboarding/createRoomRequestType';
import { ICreateRoomResponse } from '@shared/types/onboarding/createRoomResponseType';
import { getAPIResponseData } from '@shared/utils';

export const postCreateRoom = async (createRoomPayload: ICreateRoomRequest) => {
  return getAPIResponseData<ICreateRoomResponse, ICreateRoomRequest>({
    method: 'POST',
    url: API.ROOM_CREATE,
    data: createRoomPayload,
  });
};
