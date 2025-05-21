import { API } from '@shared/constants';
import { IPlaceSaveRequestType } from '@shared/types/location/placeSaveRequestType';
import { IPlaceSaveResponseType } from '@shared/types/location/placeSaveResponseType';
import { getAPIResponseData } from '@shared/utils';

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
