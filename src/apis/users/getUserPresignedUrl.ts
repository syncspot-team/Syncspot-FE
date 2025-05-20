import { API } from '@src/shared/constants';
import { IGetUserPresignedUrlResponse } from '@src/shared/types/users/getUserPresignedUrlResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getUserPresignedUrl = async (filename: string) => {
  return getAPIResponseData<IGetUserPresignedUrlResponse, void>({
    method: 'GET',
    url: API.GET_USER_PRESIGNED_PROFILE_IMAGE,
    params: { filename },
  });
};
