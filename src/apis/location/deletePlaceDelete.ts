import { API } from '@src/constants/api';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const deletePlaceDelete = async (placeId: number) => {
  return getAPIResponseData<void, void>({
    method: 'DELETE',
    url: API.PLACE_DELETE(placeId),
    params: {
      placeId,
    },
  });
};
