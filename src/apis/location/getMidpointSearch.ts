import { API } from '@src/constants/api';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getMidpointSearch = async (roomId: string) => {
  return getAPIResponseData<IMidpointSearchResponseType, void>({
    method: 'GET',
    url: API.MIDPOINTS_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
