import { API } from '@shared/constants';
import { IModifyPasswordRequestType } from '@shared/types/users/modifyPasswordRequestType';
import { getAPIResponseData } from '@shared/utils';

export const patchModifyPassword = async (
  modifyPasswordPayload: IModifyPasswordRequestType,
) => {
  return getAPIResponseData<void, IModifyPasswordRequestType>({
    method: 'PATCH',
    url: API.MODIFY_PASSWORD,
    data: modifyPasswordPayload,
  });
};
