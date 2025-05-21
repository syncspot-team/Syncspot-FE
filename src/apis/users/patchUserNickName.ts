import { API } from '@shared/constants';
import { IModifyUserNicknameRequest } from '@shared/types/users/modifyUserNicknameRequestType';
import { getAPIResponseData } from '@shared/utils';

export const patchUserNickName = async (
  modifyUserNicknamePayload: IModifyUserNicknameRequest,
) => {
  return getAPIResponseData<void, IModifyUserNicknameRequest>({
    method: 'PATCH',
    url: API.USER_NICKNAME_UPDATE,
    data: modifyUserNicknamePayload,
  });
};
