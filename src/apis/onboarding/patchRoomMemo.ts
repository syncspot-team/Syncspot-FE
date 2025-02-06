import { API } from '@src/constants/api';
import {
  IPatchRoomMemoRequestPayloadType,
  IPatchRoomMemoRequestType,
} from '@src/types/onboarding/patchRoomMemoRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
