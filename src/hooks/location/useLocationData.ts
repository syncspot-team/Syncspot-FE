import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { ILocation } from '@src/types/location/placeSearchResponseType';

export function useLocationData() {
  const { roomId } = useParams();
  const [savedLocations, setSavedLocations] = useState<ILocation[]>([]);

  const { data: userInfo } = useGetUserInfoQuery();
  const { data: placeSearchData } = useGetPlaceSearchQuery({
    enabled: !!roomId,
  });

  return {
    savedLocations,
    setSavedLocations,
    placeSearchData,
    userInfo,
  };
}
