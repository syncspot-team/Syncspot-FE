import { API } from '@shared/constants';
import { IGetUserProfileImageResponse } from '@shared/types/users/getUserProfileImageResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getUserProfileImage = async () => {
  return getAPIResponseData<IGetUserProfileImageResponse, void>({
    method: 'GET',
    url: API.GET_USER_PROFILE_IMAGE,
  });
};
