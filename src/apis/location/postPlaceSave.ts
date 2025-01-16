import { API } from '@src/constants/api';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { IPlaceSaveResponseType } from '@src/types/location/placeSaveResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postPlaceSave = async (
  roomId: string,
  placeSavePayload: IPlaceSaveRequestType,
) => {
  return getAPIResponseData<IPlaceSaveResponseType, IPlaceSaveRequestType>({
    method: 'POST',
    url: API.PLACE_SAVE(roomId),
    data: placeSavePayload,
    params: {
      roomId,
    },
  });
};
