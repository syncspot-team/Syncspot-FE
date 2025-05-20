import { API } from '@src/shared/constants';
import { IGetUserInfoResponse } from '@src/shared/types/users/getUserInfoResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getUserInfo = async () => {
  return getAPIResponseData<IGetUserInfoResponse, void>({
    method: 'GET',
    url: API.USER_INFO_SEARCH,
  });
};
