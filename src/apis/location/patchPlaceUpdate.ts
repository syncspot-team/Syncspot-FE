import { API } from '@src/shared/constants';
import { IPlaceUpdateRequestType } from '@src/shared/types/location/placeUpdateRequestType';
import { getAPIResponseData } from '@src/shared/utils';

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
