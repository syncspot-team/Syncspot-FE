import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPlaceVoteRoomCheck } from '@src/apis/place/getPlaceVoteRoomCheck';
import { PLACE_VOTE_ROOM_KEY } from './key';
import { IPlaceVoteRoomCheckResponseType } from '@src/types/place/placeVoteRoomCheckResponseType';
import { useParams } from 'react-router-dom';

export const useGetPlaceVoteRoomCheckQuery = (
  options?: Omit<
    UseQueryOptions<IPlaceVoteRoomCheckResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_ROOM_CHECK(roomId!),
    queryFn: () => getPlaceVoteRoomCheck(roomId!),
    ...options,
  });
};
