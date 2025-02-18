import { API } from '@src/constants/api';
import { IGetUserPresignedUrlResponse } from '@src/types/users/getUserPresignedUrlResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getUserPresignedUrl = async (filename: string) => {
  return getAPIResponseData<IGetUserPresignedUrlResponse, void>({
    method: 'GET',
    url: API.GET_USER_PRESIGNED_PROFILE_IMAGE,
    params: { filename },
  });
};
