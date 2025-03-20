import { usePlaceSaveMutation } from '@src/state/mutations/location/usePlaceSaveMutation';
import { usePlaceUpdateMutation } from '@src/state/mutations/location/usePlaceUpdateMutation';
import { usePlaceDeleteMutation } from '@src/state/mutations/location/usePlaceDeleteMutation';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import { ILocation } from '@src/types/location/placeSearchResponseType';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';

interface INewLocation {
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

interface ILocationForm {
  myLocations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
  }[];
  friendLocations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
  }[];
}

interface UseLocationMutationsProps {
  myLocations: IPlaceSaveRequestType[];
  friendLocations: IPlaceSaveRequestType[];
  setLocationValue: UseFormSetValue<ILocationForm>;
  removeMyLocation: (index: number) => void;
}

export function useLocationMutations({
  myLocations,
  friendLocations,
  setLocationValue,
  removeMyLocation,
}: UseLocationMutationsProps) {
  const [savedLocations, setSavedLocations] = useState<ILocation[]>([]);
  const { mutate: placeSaveMutation } = usePlaceSaveMutation();
  const { mutate: placeUpdateMutation } = usePlaceUpdateMutation();
  const { mutate: placeDeleteMutation } = usePlaceDeleteMutation();

  const handleLocationSelect = (location: ISelectedLocation, index: number) => {
    const { place, address } = location;

    const currentLocation = myLocations[index];
    const newLocation: INewLocation = {
      siDo: address?.address.region_1depth_name || '',
      siGunGu: address?.address.region_2depth_name || '',
      roadNameAddress: place.place_name || '',
      addressLat: address?.y ? parseFloat(address.y) : 0,
      addressLong: address?.x ? parseFloat(address.x) : 0,
    };

    const isDuplicate = [...myLocations, ...friendLocations].some(
      (loc, idx) =>
        (idx !== index || loc !== currentLocation) &&
        loc.addressLat === newLocation.addressLat &&
        loc.addressLong === newLocation.addressLong,
    );

    if (isDuplicate) {
      CustomToast({
        type: TOAST_TYPE.WARNING,
        message: '이미 등록된 장소입니다.',
      });
      return false;
    }

    const existingLocation = savedLocations.find(
      (loc) =>
        loc.roadNameAddress === currentLocation.roadNameAddress &&
        loc.addressLat === currentLocation.addressLat &&
        loc.addressLong === currentLocation.addressLong,
    );

    if (existingLocation) {
      handleLocationUpdate(existingLocation.placeId, newLocation, index);
    } else {
      handleLocationSave(newLocation, index);
    }

    return true;
  };

  const handleLocationUpdate = (
    placeId: number,
    newLocation: INewLocation,
    index: number,
  ) => {
    placeUpdateMutation(
      {
        placeUpdatePayload: {
          placeId,
          ...newLocation,
        },
      },
      {
        onSuccess: () => updateLocationState(newLocation, index),
      },
    );
  };

  const handleLocationSave = (newLocation: INewLocation, index: number) => {
    placeSaveMutation(
      { placeSavePayload: newLocation },
      {
        onSuccess: () => updateLocationState(newLocation, index),
      },
    );
  };

  const handleDeleteLocation = (index: number) => {
    const locationToDelete = myLocations[index];
    const savedLocation = savedLocations.find(
      (loc) => loc.roadNameAddress === locationToDelete.roadNameAddress,
    );

    if (savedLocation) {
      placeDeleteMutation(
        { placeId: savedLocation.placeId },
        {
          onSuccess: () => {
            setSavedLocations((prev) =>
              prev.filter((loc) => loc.placeId !== savedLocation.placeId),
            );
            removeMyLocation(index);
            CustomToast({
              type: TOAST_TYPE.SUCCESS,
              message: '장소가 삭제되었습니다.',
            });
          },
        },
      );
    } else {
      removeMyLocation(index);
    }
  };

  const updateLocationState = (newLocation: INewLocation, index: number) => {
    Object.entries(newLocation).forEach(([key, value]) => {
      setLocationValue(
        `myLocations.${index}.${key}` as `myLocations.${number}.${keyof INewLocation}`,
        value,
      );
    });
  };

  return {
    savedLocations,
    setSavedLocations,
    handleLocationSelect,
    handleDeleteLocation,
  };
}
