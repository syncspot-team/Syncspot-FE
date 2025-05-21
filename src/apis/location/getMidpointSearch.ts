import { API } from '@shared/constants';
import { IMidpointSearchResponseType } from '@shared/types/location/midpointSearchResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getMidpointSearch = async (roomId: string) => {
  return getAPIResponseData<IMidpointSearchResponseType, void>({
    method: 'GET',
    url: API.MIDPOINTS_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
