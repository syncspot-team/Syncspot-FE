import { API } from '@src/constants/api';
import { IMidpointTimeSearchResponseType } from '@src/types/location/midpointTimeSearchResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
