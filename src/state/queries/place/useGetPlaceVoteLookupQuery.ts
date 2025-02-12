import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPlaceVoteLookup } from '@src/apis/place/getPlaceVoteLookup';
import { PLACE_VOTE_ROOM_KEY } from './key';
import { IPlaceVoteLookupResponseType } from '@src/types/place/placeVoteLookupResponseType';
import { useParams } from 'react-router-dom';

export const useGetPlaceVoteLookupQuery = (
  options?: Omit<
    UseQueryOptions<IPlaceVoteLookupResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_LOOKUP(roomId!),
    queryFn: () => getPlaceVoteLookup(roomId!),
    ...options,
  });
};
