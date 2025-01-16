import { API } from '@src/constants/api';
import { IPlaceUpdateRequestType } from '@src/types/location/placeUpdateRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const patchPlaceUpdate = async (
  roomId: string,
  placeUpdatePayload: IPlaceUpdateRequestType,
) => {
  return getAPIResponseData<void, IPlaceUpdateRequestType>({
    method: 'PATCH',
    url: API.PLACE_UPDATE(roomId),
    data: placeUpdatePayload,
    params: {
      roomId,
    },
  });
};
