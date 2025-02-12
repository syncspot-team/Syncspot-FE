import { API } from '@src/constants/api';
import { IPlaceRevoteRequestType } from '@src/types/place/placeRevoteRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
