import { useDeviceType } from '@src/hooks/useDeviceType';
import DesktopLocationEnter from '@src/components/location/LocationEnterPage/DesktopLocationEnter';
import MobileLocationEnter from '@src/components/location/LocationEnterPage/MobileLocationEnter';
import { useLocationData } from '@src/hooks/location/useLocationData';
import { useLocationMutations } from '@src/hooks/location/useLocationMutations';
import { useRef } from 'react';
import { useAutoScroll } from '@src/hooks/location/useAutoScroll';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import { useLocationForm } from '@src/hooks/location/useLocationForm';
import { useLocationInitialization } from '@src/hooks/location/useLocationInitialization';

interface ILocationField {
  id: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

interface ICoordinate {
  lat: number;
  lng: number;
  isMyLocation: boolean;
  roadNameAddress: string;
}

export interface LocationEnterProps {
  lastLocationRef: React.RefObject<HTMLLIElement>;
  locationListRef: React.RefObject<HTMLUListElement>;
  myLocationFields: ILocationField[];
  friendLocationFields: ILocationField[];
  handleLocationSelect: (location: ISelectedLocation, index: number) => boolean;
  handleDeleteLocation: (index: number) => void;
  handleAddLocation: () => void;
  isAllMyLocationsFilled: boolean;
  coordinates: ICoordinate[];
  shouldShowMap: boolean;
}

export default function LocationEnterPage() {
  const { isMobile } = useDeviceType();
  const lastLocationRef = useRef<HTMLLIElement>(null);
  const locationListRef = useRef<HTMLUListElement>(null);

  const { placeSearchData, userInfo } = useLocationData();

  const {
    myLocationFields,
    friendLocationFields,
    setLocationValue,
    resetLocation,
    removeMyLocation,
    handleAddLocation,
    myLocations,
    friendLocations,
    isAllMyLocationsFilled,
    coordinates,
    shouldShowMap,
  } = useLocationForm();

  const {
    handleLocationSelect,
    handleDeleteLocation,
    savedLocations,
    setSavedLocations,
  } = useLocationMutations({
    myLocations,
    friendLocations,
    setLocationValue,
    removeMyLocation,
  });

  /* 초기 데이터 설정 */
  useLocationInitialization({
    placeSearchData,
    userInfo,
    resetLocation,
    setSavedLocations,
  });

  /* 스크롤 자동 이동 */
  useAutoScroll({
    lastLocationRef,
    locationListRef,
    currentLocationsCount: myLocationFields.length,
    savedLocationsCount: savedLocations.length,
  });

  const commonProps = {
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

  return isMobile ? (
    <MobileLocationEnter {...commonProps} />
  ) : (
    <DesktopLocationEnter {...commonProps} />
  );
}
