import { API } from '@src/constants/api';
import { IModifyUserNicknameRequest } from '@src/types/users/modifyUserNicknameRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const patchUserNickName = async (
  modifyUserNicknamePayload: IModifyUserNicknameRequest,
) => {
  return getAPIResponseData<void, IModifyUserNicknameRequest>({
    method: 'PATCH',
    url: API.USER_NICKNAME_UPDATE,
    data: modifyUserNicknamePayload,
  });
};
