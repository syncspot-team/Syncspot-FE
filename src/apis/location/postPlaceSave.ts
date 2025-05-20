import { API } from '@src/shared/constants';
import { IPlaceSaveRequestType } from '@src/shared/types/location/placeSaveRequestType';
import { IPlaceSaveResponseType } from '@src/shared/types/location/placeSaveResponseType';
import { getAPIResponseData } from '@src/shared/utils';

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
