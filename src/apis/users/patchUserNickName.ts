import { API } from '@src/shared/constants';
import { IModifyUserNicknameRequest } from '@src/shared/types/users/modifyUserNicknameRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const patchUserNickName = async (
  modifyUserNicknamePayload: IModifyUserNicknameRequest,
) => {
  return getAPIResponseData<void, IModifyUserNicknameRequest>({
    method: 'PATCH',
    url: API.USER_NICKNAME_UPDATE,
    data: modifyUserNicknamePayload,
  });
};
