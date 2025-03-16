import { useRef } from 'react';
import { useLocationData } from './useLocationData';
import { useLocationForm } from './useLocationForm';
import { useAutoScroll } from './useAutoScroll';
import { useLocationMutations } from './useLocationMutations';
import { useLocationInitialization } from './useLocationInitialization';

export function useLocationEnter() {
  const lastLocationRef = useRef<HTMLLIElement>(null);
  const locationListRef = useRef<HTMLUListElement>(null);

  const { savedLocations, setSavedLocations, placeSearchData, userInfo } =
    useLocationData();

  const {
    myLocationFields,
    friendLocationFields,
    setValue,
    resetLocation,
    removeMyLocation,
    myLocations,
    friendLocations,
    appendMyLocation,
    isAllMyLocationsFilled,
    coordinates,
    shouldShowMap,
  } = useLocationForm();

  useLocationInitialization({
    placeSearchData,
    userInfo,
    resetLocation,
    setSavedLocations,
  });

  const { handleLocationSelect, handleDeleteLocation } = useLocationMutations({
    savedLocations,
    setSavedLocations,
    myLocations,
    friendLocations,
    setValue,
    removeMyLocation,
  });

  useAutoScroll({
    lastLocationRef,
    locationListRef,
    currentLocationsCount: myLocationFields.length,
    savedLocationsCount: savedLocations.length,
  });

  const handleAddLocation = () => {
    appendMyLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  return {
    lastLocationRef,
    locationListRef,
    myLocationFields,
    friendLocationFields,
    handleLocationSelect,
    handleDeleteLocation,
    handleAddLocation,
    isAllMyLocationsFilled,
    coordinates,
    shouldShowMap,
  };
}
