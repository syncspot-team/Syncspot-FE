import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfileImage } from '@src/apis/users/getUserProfileImage';
import { USER_QUERY_KEY } from './key';
import { IGetUserProfileImageResponse } from '@src/types/users/getUserProfileImageResponseType';

export const useGetUserProfileImageQuery = (
  options?: Omit<
    UseQueryOptions<IGetUserProfileImageResponse, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.USER_PROFILE_IMAGE,
    queryFn: getUserProfileImage,
    ...options,
  });
};
