import { API } from '@src/shared/constants';
import { IMidpointTimeSearchResponseType } from '@src/shared/types/location/midpointTimeSearchResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getMidpointTimeSearch = async (
  roomId: string,
  destLatitude: number,
  destLongitude: number,
) => {
  return getAPIResponseData<IMidpointTimeSearchResponseType, void>({
    method: 'GET',
    url: API.MIDPOINTS_TIME_SEARCH(roomId),
    params: {
      roomId,
      destLatitude,
      destLongitude,
    },
  });
};
