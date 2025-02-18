import { API } from '@src/constants/api';
import { IGetUserInfoResponse } from '@src/types/users/getUserInfoResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getUserInfo = async () => {
  return getAPIResponseData<IGetUserInfoResponse, void>({
    method: 'GET',
    url: API.USER_INFO_SEARCH,
  });
};
