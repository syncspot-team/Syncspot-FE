/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

interface ICoordinates {
  lat: number;
  lng: number;
  isMyLocation: boolean;
  roadNameAddress: string;
  isSelected?: boolean;
  duration?: string;
  distance?: string;
}

interface IKakaoMap {
  coordinates: ICoordinates[];
}

export default function KakaoMap({ coordinates }: IKakaoMap) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const initialBoundsSet = useRef(false);
  const previousCoordinates = useRef<IKakaoMap['coordinates']>([]);

  const DEFAULT_LOCATION = {
    lat: 37.557527,
    lng: 126.925595,
    level: 3,
  };

  const placeMarker = (
    lat: number,
    lng: number,
    map: any,
    isMyLocation: boolean,
    roadNameAddress: string,
    isSelected?: boolean,
    duration?: string,
  ) => {
    const coords = new window.kakao.maps.LatLng(lat, lng);

    const markerContent = document.createElement('div');
    markerContent.className =
      'relative flex items-center justify-center size-12';
    markerContent.style.transition = 'all 0.3s ease-in-out';

    const baseZIndex = isSelected ? 1000000 : isMyLocation ? 500000 : 100000;
    markerContent.style.zIndex = String(baseZIndex);

    const ping = document.createElement('div');
    ping.className = `absolute w-full h-full ${
      isMyLocation ? 'bg-red-400' : 'bg-indigo-400'
    } rounded-full opacity-75 animate-ping`;
    markerContent.appendChild(ping);

    const markerElement = document.createElement('div');
    markerElement.className = `relative ${
      isMyLocation ? 'bg-red-600' : 'bg-indigo-600'
    } rounded-full size-3`;
    markerElement.style.transition = 'all 0.3s ease-in-out';
    markerContent.appendChild(markerElement);

    const markerSvg = document.createElement('img');
    markerSvg.src = isMyLocation ? '/selectedMarker.svg' : '/marker.svg';
    markerSvg.className = 'absolute size-9';
    markerSvg.style.transition = 'all 0.3s ease-in-out';
    markerContent.appendChild(markerSvg);

    const addressContent = document.createElement('div');
    addressContent.className = `absolute flex flex-nowrap items-center gap-2 px-3 py-2 border shadow-md text-description lg:text-content -top-16 rounded-default whitespace-nowrap ${
      isSelected
        ? 'bg-blue-normal01 text-white-default border-blue-normal01'
        : 'bg-white-default text-black border-primary'
    }`;
    addressContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    addressContent.style.zIndex = String(baseZIndex + 1);

    const addressText = document.createElement('span');
    addressText.textContent = duration
      ? `${roadNameAddress}에서 ${duration} 소요`
      : roadNameAddress;
    addressContent.appendChild(addressText);

    markerContent.appendChild(addressContent);

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: coords,
      content: markerContent,
      yAnchor: 1,
      zIndex: baseZIndex,
    });

    const hoverZIndex = 2000000;
    markerContent.addEventListener('mouseenter', () => {
      customOverlay.setZIndex(hoverZIndex);
      markerContent.style.zIndex = String(hoverZIndex);
      addressContent.style.zIndex = String(hoverZIndex + 1);
      addressContent.style.transform = 'scale(1.05)';
      addressContent.style.boxShadow =
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
    });

    markerContent.addEventListener('mouseleave', () => {
      customOverlay.setZIndex(baseZIndex);
      markerContent.style.zIndex = String(baseZIndex);
      addressContent.style.zIndex = String(baseZIndex + 1);
      addressContent.style.transform = 'scale(1)';
      addressContent.style.boxShadow =
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
    });

    const markerKey = `${lat}-${lng}`;
    markersRef.current.set(markerKey, customOverlay);
    customOverlay.setMap(map);
  };

  const isMarkerInBounds = (lat: number, lng: number, map: any) => {
    const bounds = map.getBounds();
    const latLng = new window.kakao.maps.LatLng(lat, lng);
    return bounds.contain(latLng);
  };

  const areAllMarkersVisible = (coords: IKakaoMap['coordinates'], map: any) => {
    return coords.every((coord) => isMarkerInBounds(coord.lat, coord.lng, map));
  };

  const updateMarkerStyle = (
    overlay: any,
    coord: IKakaoMap['coordinates'][0],
  ) => {
    const content = overlay.getContent();
    const addressContent = content.querySelector('div:last-child');
    const markerElement = content.querySelector('div:nth-child(2)');
    const markerSvg = content.querySelector('img');

    // 주소 텍스트 업데이트 (시간 정보 포함)
    const addressText = addressContent.querySelector('span');
    addressText.textContent = coord.duration
      ? `${coord.roadNameAddress}에서 ${coord.duration} 소요`
      : coord.roadNameAddress;

    if (coord.isSelected) {
      overlay.setZIndex(3000);
      addressContent.className = `absolute flex flex-nowrap items-center gap-2 px-3 py-2 border shadow-md text-description lg:text-content -top-16 rounded-default whitespace-nowrap bg-blue-normal01 text-white-default border-blue-normal01`;
      addressContent.style.transition = 'none';
      markerElement.className = `relative bg-indigo-600 rounded-full size-3 scale-110`;
      markerSvg.className = 'absolute scale-110 size-9';
    } else {
      overlay.setZIndex(coord.isMyLocation ? 2000 : 1);
      addressContent.className = `absolute flex flex-nowrap items-center gap-2 px-3 py-2 border shadow-md text-description lg:text-content -top-16 rounded-default whitespace-nowrap bg-white-default text-black border-primary`;
      addressContent.style.transition = 'none';
      markerElement.className = `relative ${
        coord.isMyLocation ? 'bg-red-600' : 'bg-indigo-600'
      } rounded-full size-3`;
      markerSvg.className = 'absolute size-9';
    }
  };

  const updateMap = () => {
    if (!mapRef.current) return;

    const currentMarkerKeys = new Set(markersRef.current.keys());

    // 마커가 삭제되었는지 확인
    const markersDeleted =
      coordinates.length < previousCoordinates.current.length;

    // 모든 마커가 보이는지 확인
    const allMarkersVisible = areAllMarkersVisible(coordinates, mapRef.current);

    // 바운드 업데이트가 필요한 경우:
    // 1. 초기 바운드가 설정되지 않은 경우
    // 2. 마커가 삭제된 경우
    // 3. 모든 마커가 현재 맵 영역에 보이지 않는 경우
    const shouldUpdateBounds =
      !initialBoundsSet.current || markersDeleted || !allMarkersVisible;

    // 좌표가 없는 경우 기본 위치로 이동
    if (coordinates.length === 0) {
      mapRef.current.setCenter(
        new window.kakao.maps.LatLng(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lng,
        ),
      );
      mapRef.current.setLevel(DEFAULT_LOCATION.level);
      initialBoundsSet.current = false;
      return;
    }

    // 마커 업데이트
    coordinates.forEach((coord) => {
      const markerKey = `${coord.lat}-${coord.lng}`;
      currentMarkerKeys.delete(markerKey);

      if (!markersRef.current.has(markerKey)) {
        placeMarker(
          coord.lat,
          coord.lng,
          mapRef.current,
          coord.isMyLocation,
          coord.roadNameAddress,
          coord.isSelected,
        );
      } else {
        const existingOverlay = markersRef.current.get(markerKey);
        updateMarkerStyle(existingOverlay, coord);
      }
    });

    // 제거된 마커 정리
    currentMarkerKeys.forEach((key) => {
      const overlay = markersRef.current.get(key);
      if (overlay) {
        overlay.setMap(null);
        markersRef.current.delete(key);
      }
    });

    // 바운드 업데이트
    if (shouldUpdateBounds) {
      const bounds = calculateBounds(coordinates);
      mapRef.current.setBounds(bounds);
      initialBoundsSet.current = true;
    }

    previousCoordinates.current = [...coordinates];
  };

  const calculateBounds = (coords: IKakaoMap['coordinates']) => {
    // 좌표가 없는 경우 기본 위치의 bounds 반환
    if (coords.length === 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      bounds.extend(
        new window.kakao.maps.LatLng(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lng,
        ),
      );
      return bounds;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    let minLat = Infinity,
      maxLat = -Infinity;
    let minLng = Infinity,
      maxLng = -Infinity;

    coords.forEach(({ lat, lng }) => {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    const latPadding = (maxLat - minLat) * 0.2;
    const lngPadding = (maxLng - minLng) * 0.2;
    bounds.extend(
      new window.kakao.maps.LatLng(minLat - latPadding, minLng - lngPadding),
    );
    bounds.extend(
      new window.kakao.maps.LatLng(maxLat + latPadding, maxLng + lngPadding),
    );

    return bounds;
  };

  const initMap = () => {
    if (!containerRef.current || mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(
        coordinates.length > 0 ? coordinates[0].lat : DEFAULT_LOCATION.lat,
        coordinates.length > 0 ? coordinates[0].lng : DEFAULT_LOCATION.lng,
      ),
      level: DEFAULT_LOCATION.level,
    };

    const map = new window.kakao.maps.Map(containerRef.current, options);
    mapRef.current = map;

    // 초기 마커 생성
    if (coordinates.length > 0) {
      updateMap();
    }
  };

  useEffect(() => {
    const loadMap = () => {
      if (window.kakao && window.kakao.maps) {
        if (!window.kakao.maps.Map) {
          window.kakao.maps.load(() => {
            const checkContainer = () => {
              if (
                containerRef.current &&
                containerRef.current.offsetHeight > 0
              ) {
                initMap();
              } else {
                setTimeout(checkContainer, 100);
              }
            };
            checkContainer();
          });
        } else {
          initMap();
        }
      }
    };

    loadMap();
  }, []);

  useEffect(() => {
    updateMap();
  }, [coordinates]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.relayout();
          if (coordinates.length > 0) {
            const bounds = calculateBounds(coordinates);
            mapRef.current.setBounds(bounds);
          }
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [coordinates]);

  return <div ref={containerRef} className="w-full h-full rounded-default" />;
}
