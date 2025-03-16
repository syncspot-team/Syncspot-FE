import { useParams } from 'react-router-dom';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';

export function useLocationData() {
  const { roomId } = useParams();

  const { data: userInfo } = useGetUserInfoQuery();
  const { data: placeSearchData } = useGetPlaceSearchQuery({
    enabled: !!roomId,
  });

  return {
    placeSearchData,
    userInfo,
  };
}
