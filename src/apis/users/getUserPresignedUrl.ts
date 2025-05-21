import { API } from '@shared/constants';
import { IGetUserPresignedUrlResponse } from '@shared/types/users/getUserPresignedUrlResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getUserPresignedUrl = async (filename: string) => {
  return getAPIResponseData<IGetUserPresignedUrlResponse, void>({
    method: 'GET',
    url: API.GET_USER_PRESIGNED_PROFILE_IMAGE,
    params: { filename },
  });
};
