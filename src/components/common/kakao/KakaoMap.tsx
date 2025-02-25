/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export interface ICoordinate {
  lat: number;
  lng: number;
  isMyLocation: boolean;
  roadNameAddress: string;
  isSelected?: boolean;
}

interface IKakaoMap {
  coordinates: ICoordinate[];
}

export default function KakaoMap({ coordinates }: IKakaoMap) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const initialBoundsSet = useRef(false);
  const previousCoordinates = useRef<ICoordinate[]>([]);

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
  ) => {
    const coords = new window.kakao.maps.LatLng(lat, lng);

    // 마커 컨테이너
    const markerContent = document.createElement('div');
    markerContent.className =
      'relative flex items-center justify-center size-12';

    // 기본 z-index 설정
    const baseZIndex = isSelected ? 1000000 : isMyLocation ? 500000 : 100000;
    markerContent.style.zIndex = String(baseZIndex);

    // 핑 애니메이션
    const ping = document.createElement('div');
    ping.className = `absolute w-full h-full ${
      isMyLocation ? 'bg-red-400' : 'bg-indigo-400'
    } rounded-full opacity-75 animate-ping`;
    markerContent.appendChild(ping);

    // 마커 중심점
    const markerElement = document.createElement('div');
    markerElement.className = `relative ${
      isMyLocation ? 'bg-red-600' : 'bg-indigo-600'
    } rounded-full size-3`;
    markerContent.appendChild(markerElement);

    // 마커 이미지
    const markerSvg = document.createElement('img');
    markerSvg.src = isMyLocation ? '/selectedMarker.svg' : '/marker.svg';
    markerSvg.className = 'absolute size-9';
    markerContent.appendChild(markerSvg);

    // 주소 텍스트
    const addressContent = document.createElement('div');
    addressContent.className = `absolute flex items-center justify-center px-3 py-2 border shadow-md text-menu -top-10 rounded-default whitespace-nowrap ${
      isSelected
        ? 'bg-blue-normal01 text-white-default border-blue-normal01'
        : 'bg-white-default text-black border-primary'
    }`;
    addressContent.style.zIndex = String(baseZIndex + 1);
    addressContent.textContent = roadNameAddress;
    markerContent.appendChild(addressContent);

    // CustomOverlay 생성
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: coords,
      content: markerContent,
      yAnchor: 1,
      zIndex: baseZIndex,
    });

    // 호버 이벤트
    const hoverZIndex = 2000000;
    markerContent.addEventListener('mouseenter', () => {
      customOverlay.setZIndex(hoverZIndex);
      markerContent.style.zIndex = String(hoverZIndex);
      addressContent.style.zIndex = String(hoverZIndex + 1);
      addressContent.style.transform = 'scale(1.05)';
      addressContent.style.boxShadow =
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    });

    markerContent.addEventListener('mouseleave', () => {
      customOverlay.setZIndex(baseZIndex);
      markerContent.style.zIndex = String(baseZIndex);
      addressContent.style.zIndex = String(baseZIndex + 1);
      addressContent.style.transform = 'scale(1)';
      addressContent.style.boxShadow = '';
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

  const areAllMarkersVisible = (coords: ICoordinate[], map: any) => {
    return coords.every((coord) => isMarkerInBounds(coord.lat, coord.lng, map));
  };

  const updateMarkerStyle = (overlay: any, coord: ICoordinate) => {
    const content = overlay.getContent();
    const addressContent = content.querySelector('div:last-child');

    // 선택 상태에 따라 스타일 업데이트
    if (coord.isSelected) {
      overlay.setZIndex(3000);
      addressContent.className = `absolute flex items-center justify-center px-3 py-2 border shadow-md text-menu -top-10 rounded-default whitespace-nowrap bg-blue-normal01 text-white-default border-blue-normal01`;
    } else {
      overlay.setZIndex(coord.isMyLocation ? 2000 : 1);
      addressContent.className = `absolute flex items-center justify-center px-3 py-2 border shadow-md text-menu -top-10 rounded-default whitespace-nowrap bg-white-default text-black border-primary`;
    }
  };

  const updateMap = () => {
    if (!mapRef.current) return;

    const currentMarkerKeys = new Set(markersRef.current.keys());
    let shouldUpdateBounds = false;

    // 마커가 삭제되었는지 확인
    const isMarkerDeleted =
      coordinates.length < previousCoordinates.current.length;

    // 좌표가 없는 경우 기본 위치로 맵 중심 이동
    if (!coordinates || coordinates.length === 0) {
      mapRef.current.setCenter(
        new window.kakao.maps.LatLng(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lng,
        ),
      );
      mapRef.current.setLevel(DEFAULT_LOCATION.level);
      return;
    }

    // 새로운 마커 추가 또는 기존 마커 업데이트
    coordinates.forEach((coord) => {
      const markerKey = `${coord.lat}-${coord.lng}`;
      currentMarkerKeys.delete(markerKey);

      // 새로운 마커인 경우, 현재 맵 영역에 포함되는지 확인
      if (!markersRef.current.has(markerKey)) {
        if (!isMarkerInBounds(coord.lat, coord.lng, mapRef.current)) {
          shouldUpdateBounds = true;
        }
      }

      // 이미 존재하는 마커는 스타일만 업데이트
      if (markersRef.current.has(markerKey)) {
        const existingOverlay = markersRef.current.get(markerKey);
        updateMarkerStyle(existingOverlay, coord);
        return;
      }

      // 새로운 마커 생성
      placeMarker(
        coord.lat,
        coord.lng,
        mapRef.current,
        coord.isMyLocation,
        coord.roadNameAddress,
        coord.isSelected,
      );
    });

    // 제거된 마커 정리
    currentMarkerKeys.forEach((key) => {
      const overlay = markersRef.current.get(key);
      if (overlay) {
        overlay.setMap(null);
        markersRef.current.delete(key);
      }
    });

    // bounds 업데이트가 필요한 경우에만 실행
    if (
      !initialBoundsSet.current ||
      shouldUpdateBounds ||
      isMarkerDeleted ||
      (coordinates.length > 0 &&
        !areAllMarkersVisible(coordinates, mapRef.current))
    ) {
      const bounds = calculateBounds(coordinates);
      mapRef.current.setBounds(bounds);
      if (!initialBoundsSet.current) {
        initialBoundsSet.current = true;
      }
    }

    previousCoordinates.current = [...coordinates];
  };

  const calculateBounds = (coords: ICoordinate[]) => {
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
    if (mapRef.current) {
      updateMap();
    }
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-default"
      style={{ minHeight: '400px' }} // 최소 높이 추가
    />
  );
}
