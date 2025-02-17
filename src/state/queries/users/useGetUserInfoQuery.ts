import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserInfo } from '@src/apis/users/getUserInfo';
import { USER_QUERY_KEY } from './key';
import { IGetUserInfoResponse } from '@src/types/users/getUserInfoResponseType';

export const useGetUserInfoQuery = (
  options?: Omit<
    UseQueryOptions<IGetUserInfoResponse, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.USER_INFO,
    queryFn: getUserInfo,
    ...options,
  });
};
