import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query';
import { ROOM_QUERY_KEY } from './key';
import { getJoinRoom } from '@src/apis/header/getJoinRoom';
import { IJoinRoomResponse } from '@src/types/header/joinRoomResponseType';

export const useGetJoinRoomQuery = (
  options?: UseQueryOptions<IJoinRoomResponse, Error, IJoinRoomResponse>,
) => {
  return useQuery({
    queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
    queryFn: getJoinRoom,
    ...options,
  });
};
