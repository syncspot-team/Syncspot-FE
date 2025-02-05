import { getRoomDetailInfo } from '@src/apis/onboarding/getRoomDetailInfo';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IGetRoomDetailInfoResponseType } from '@src/types/onboarding/getRoomDetailInfoResponseType';
import { ONBOARDING_QUERY_KEY } from './key';

export const useGetRoomDetailInfoQuery = (
  roomId: string,
  options?: UseQueryOptions<IGetRoomDetailInfoResponseType, Error, any>,
) => {
  return useQuery({
    queryKey: ONBOARDING_QUERY_KEY.GET_ROOM_DETAIL_INFO(roomId),
    queryFn: () => getRoomDetailInfo(roomId),
    ...options,
  });
};
