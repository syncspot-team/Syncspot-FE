import { API } from '@src/shared/constants';
import { IModifyPasswordRequestType } from '@src/shared/types/users/modifyPasswordRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const patchModifyPassword = async (
  modifyPasswordPayload: IModifyPasswordRequestType,
) => {
  return getAPIResponseData<void, IModifyPasswordRequestType>({
    method: 'PATCH',
    url: API.MODIFY_PASSWORD,
    data: modifyPasswordPayload,
  });
};
