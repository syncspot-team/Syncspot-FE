import { API } from '@src/shared/constants';
import { getAPIResponseData } from '@src/shared/utils';
import {
  IPatchRoomNameRequestPayloadType,
  IPatchRoomNameRequestType,
} from '@src/shared/types/onboarding/patchRoomNameRequestType';

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
