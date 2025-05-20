import { API } from '@src/shared/constants';
import { IGetUserProfileImageResponse } from '@src/shared/types/users/getUserProfileImageResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getUserProfileImage = async () => {
  return getAPIResponseData<IGetUserProfileImageResponse, void>({
    method: 'GET',
    url: API.GET_USER_PROFILE_IMAGE,
  });
};
