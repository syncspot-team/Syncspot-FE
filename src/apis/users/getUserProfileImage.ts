import { API } from '@src/constants/api';
import { IGetUserProfileImageResponse } from '@src/types/users/getUserProfileImageResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getUserProfileImage = async () => {
  return getAPIResponseData<IGetUserProfileImageResponse, void>({
    method: 'GET',
    url: API.GET_USER_PROFILE_IMAGE,
  });
};
