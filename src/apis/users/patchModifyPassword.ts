import { API } from '@src/constants/api';
import { IModifyPasswordRequestType } from '@src/types/users/modifyPasswordRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const patchModifyPassword = async (
  modifyPasswordPayload: IModifyPasswordRequestType,
) => {
  return getAPIResponseData<void, IModifyPasswordRequestType>({
    method: 'PATCH',
    url: API.MODIFY_PASSWORD,
    data: modifyPasswordPayload,
  });
};
