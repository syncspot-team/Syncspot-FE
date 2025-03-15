import { useRef } from 'react';
import { useLocationData } from './useLocationData';
import { useAutoScroll } from '@src/hooks/location/useAutoScroll';
import { useLocationMutations } from './useLocationMutations';

export function useLocationEnter() {
  const lastLocationRef = useRef<HTMLLIElement>(null);
  const locationListRef = useRef<HTMLUListElement>(null);

  const locationData = useLocationData();

  const locationMutations = useLocationMutations({
    savedLocations: locationData.savedLocations,
    setSavedLocations: locationData.setSavedLocations,
    myLocations: locationData.myLocations,
    friendLocations: locationData.friendLocations,
    setValue: locationData.setValue,
    removeMyLocation: locationData.removeMyLocation,
  });

  useAutoScroll({
    lastLocationRef,
    locationListRef,
    currentLocationsCount: locationData.myLocationFields.length,
    savedLocationsCount: locationData.savedLocations.length,
  });

  const handleAddLocation = () => {
    locationData.appendMyLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  return {
    ...locationData,
    ...locationMutations,
    lastLocationRef,
    locationListRef,
    handleAddLocation,
  };
}
