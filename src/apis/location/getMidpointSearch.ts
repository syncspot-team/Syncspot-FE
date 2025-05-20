import { API } from '@src/shared/constants';
import { IMidpointSearchResponseType } from '@src/shared/types/location/midpointSearchResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getMidpointSearch = async (roomId: string) => {
  return getAPIResponseData<IMidpointSearchResponseType, void>({
    method: 'GET',
    url: API.MIDPOINTS_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
