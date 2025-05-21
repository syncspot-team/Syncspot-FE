import { API } from '@shared/constants';
import { IPlaceRevoteRequestType } from '@shared/types/place/placeRevoteRequestType';
import { getAPIResponseData } from '@shared/utils';

export const putPlaceRevote = async (
  roomId: string,
  placeRevotePayload: IPlaceRevoteRequestType,
) => {
  return getAPIResponseData<void, IPlaceRevoteRequestType>({
    method: 'PUT',
    url: API.PLACE_REVOTE(roomId),
    data: placeRevotePayload,
    params: {
      roomId,
    },
  });
};
