import { API } from '@src/constants/api';
import getAPIResponseData from '@src/utils/getAPIResponseData';
import {
  IPatchRoomNameRequestPayloadType,
  IPatchRoomNameRequestType,
} from '@src/types/onboarding/patchRoomNameRequestType';

export const patchRoomName = async ({
  roomId,
  name,
}: IPatchRoomNameRequestType) => {
  return getAPIResponseData<void, IPatchRoomNameRequestPayloadType>({
    method: 'PATCH',
    url: API.ROOM_NAME_CHANGE(roomId),
    data: { name },
    params: {
      roomId,
    },
  });
};
