import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import { useLocationData } from '@src/hooks/location/useLocationData';
import { useLocationForm } from '@src/hooks/location/useLocationForm';
import { useLocationMutations } from '@src/hooks/location/useLocationMutations';
import { useLocationInitialization } from '@src/hooks/location/useLocationInitialization';
import { useAutoScroll } from '@src/hooks/location/useAutoScroll';

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

interface LocationContextType {
  // 위치 데이터
  myLocationFields: ILocationField[];
  friendLocationFields: ILocationField[];
  coordinates: ICoordinate[];
  shouldShowMap: boolean;

  // 장소 입력 필드에 대한 ref
  lastLocationRef: React.RefObject<HTMLLIElement>;
  locationListRef: React.RefObject<HTMLUListElement>;

  // 장소 수정,저장,삭제,추가
  handleLocationSelect: (location: ISelectedLocation, index: number) => boolean;
  handleDeleteLocation: (index: number) => void;
  handleAddLocation: () => void;

  // 모든 장소가 입력되었는지 여부
  isAllMyLocationsFilled: boolean;
}

const LocationContext = createContext<LocationContextType>({
  myLocationFields: [],
  friendLocationFields: [],
  coordinates: [],
  shouldShowMap: false,
  lastLocationRef: { current: null },
  locationListRef: { current: null },
  handleLocationSelect: () => false,
  handleDeleteLocation: () => {},
  handleAddLocation: () => {},
  isAllMyLocationsFilled: false,
});

export function LocationProvider({ children }: { children: ReactNode }) {
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

  const value = {
    myLocationFields,
    friendLocationFields,
    coordinates,
    shouldShowMap,
    lastLocationRef,
    locationListRef,
    handleLocationSelect,
    handleDeleteLocation,
    handleAddLocation,
    isAllMyLocationsFilled,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  return context;
}
