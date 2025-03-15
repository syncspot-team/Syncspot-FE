import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { useLocationInitialization } from '@src/hooks/location/useLocationInitialization';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { ILocation } from '@src/types/location/placeSearchResponseType';

export interface ILocationForm {
  myLocations: IPlaceSaveRequestType[];
  friendLocations: IPlaceSaveRequestType[];
}

const isValidLocation = (loc: { addressLat: number; addressLong: number }) =>
  loc.addressLat !== 0 && loc.addressLong !== 0;

export function useLocationData() {
  const { roomId } = useParams();
  const [savedLocations, setSavedLocations] = useState<ILocation[]>([]);

  const { data: userInfo } = useGetUserInfoQuery();
  const { data: placeSearchData } = useGetPlaceSearchQuery({
    enabled: !!roomId,
  });

  const { control, setValue, watch, reset } = useForm<ILocationForm>({
    defaultValues: {
      myLocations: [],
      friendLocations: [],
    },
  });

  const {
    fields: myLocationFields,
    append: appendMyLocation,
    remove: removeMyLocation,
  } = useFieldArray({
    control,
    name: 'myLocations',
  });

  const { fields: friendLocationFields } = useFieldArray({
    control,
    name: 'friendLocations',
  });

  const myLocations = watch('myLocations');
  const friendLocations = watch('friendLocations');

  useLocationInitialization({
    placeSearchData,
    userInfo,
    reset,
    setSavedLocations,
  });

  const isAllMyLocationsFilled =
    myLocations.length > 0 && myLocations.every(isValidLocation);

  const formatLocations = (
    locations: typeof myLocations | undefined,
    isMyLocation: boolean,
  ) =>
    locations?.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation,
      roadNameAddress: location.roadNameAddress,
    })) || [];

  const coordinates = [
    ...formatLocations(myLocations, true),
    ...formatLocations(friendLocations, false),
  ];

  return {
    savedLocations,
    setSavedLocations,
    myLocationFields,
    friendLocationFields,
    appendMyLocation,
    removeMyLocation,
    setValue,
    myLocations,
    friendLocations,
    isAllMyLocationsFilled,
    coordinates,
    shouldShowMap: coordinates.length > 0,
  };
}
