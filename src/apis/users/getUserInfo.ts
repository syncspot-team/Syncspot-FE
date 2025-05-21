import { API } from '@shared/constants';
import { IGetUserInfoResponse } from '@shared/types/users/getUserInfoResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getUserInfo = async () => {
  return getAPIResponseData<IGetUserInfoResponse, void>({
    method: 'GET',
    url: API.USER_INFO_SEARCH,
  });
};
