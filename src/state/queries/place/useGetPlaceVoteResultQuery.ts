import { getPlaceVoteResult } from '@src/apis/place/getPlaceVoteResult';
import { PLACE_VOTE_ROOM_KEY } from '@src/state/queries/place/key';
import { PlaceVoteResultResponseType } from '@src/types/place/placeVoteResultResponseType';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetPlaceVoteResultQuery = (
  options?: Omit<
    UseQueryOptions<PlaceVoteResultResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_RESULT(roomId!),
    queryFn: () => getPlaceVoteResult(roomId!),
    ...options,
  });
};
