import { API } from '@shared/constants';
import {
  IPatchRoomMemoRequestPayloadType,
  IPatchRoomMemoRequestType,
} from '@shared/types/onboarding/patchRoomMemoRequestType';
import { getAPIResponseData } from '@shared/utils';

export const patchRoomMemo = async ({
  roomId,
  memo,
}: IPatchRoomMemoRequestType) => {
  return getAPIResponseData<void, IPatchRoomMemoRequestPayloadType>({
    method: 'PATCH',
    url: API.ROOM_MEMO_CHANGE(roomId),
    data: { memo },
    params: {
      roomId,
    },
  });
};
