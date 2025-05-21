import { API } from '@shared/constants';
import { getAPIResponseData } from '@shared/utils';

export const deletePlaceDelete = async (placeId: number) => {
  return getAPIResponseData<void, void>({
    method: 'DELETE',
    url: API.PLACE_DELETE(placeId),
    params: {
      placeId,
    },
  });
};
