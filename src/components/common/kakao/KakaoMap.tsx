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
  const markersRef = useRef<any[]>([]);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  const placeMarker = (
    lat: number,
    lng: number,
    map: any,
    isMyLocation: boolean,
    roadNameAddress: string,
    isSelected?: boolean,
  ) => {
    const coords = new window.kakao.maps.LatLng(lat, lng);

    // 커스텀 마커 생성
    const markerContent = document.createElement('div');
    markerContent.className = `relative flex items-center justify-center size-12`;

    const ping = document.createElement('div');
    ping.className = `absolute w-full h-full ${isMyLocation ? 'bg-red-400' : 'bg-indigo-400'} rounded-full opacity-75 animate-ping`;
    markerContent.appendChild(ping);

    const markerElement = document.createElement('div');
    markerElement.className = `relative ${isMyLocation ? 'bg-red-600' : 'bg-indigo-600'} rounded-full size-3`;
    markerContent.appendChild(markerElement);

    const markerSvg = document.createElement('img');
    markerSvg.src = isMyLocation ? '/selectedMarker.svg' : '/marker.svg';
    markerSvg.className = 'absolute size-9';
    markerContent.appendChild(markerSvg);

    // 텍스트 오버레이를 마커 컨텐츠의 일부로 추가
    const addressContent = document.createElement('div');
    addressContent.className = `absolute flex items-center justify-center px-3 py-2 border shadow-md text-menu -top-10 rounded-default whitespace-nowrap ${
      isSelected
        ? 'bg-blue-normal01 text-white-default border-blue-normal01'
        : 'bg-white-default text-black border-primary'
    }`;
    addressContent.textContent = roadNameAddress;
    markerContent.appendChild(addressContent);

    // CustomOverlay 생성
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: coords,
      content: markerContent,
      yAnchor: 1,
      zIndex: isMyLocation ? 1000 : 1,
    });

    // 마우스 호버 이벤트 추가
    addressContent.addEventListener('mouseenter', () => {
      customOverlay.setZIndex(2000);
      addressContent.style.transform = 'scale(1.05)';
      addressContent.style.boxShadow =
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    });

    addressContent.addEventListener('mouseleave', () => {
      customOverlay.setZIndex(isMyLocation ? 1000 : 1);
      addressContent.style.transform = 'scale(1)';
      addressContent.style.boxShadow = '';
    });

    markersRef.current.push(customOverlay);
    customOverlay.setMap(map);
  };

  const updateMap = () => {
    if (!mapRef.current) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    markersRef.current.forEach((customOverlay) => {
      customOverlay.setMap(null);
    });
    markersRef.current = [];

    // 모든 좌표의 최소/최대값을 찾아서 여유 공간을 추가
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    coordinates.forEach(({ lat, lng }) => {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    // 위도에 여유 공간 추가 (텍스트 오버레이를 위한 공간)
    const latPadding = (maxLat - minLat) * 0.1; // 10% 여유 공간
    bounds.extend(new window.kakao.maps.LatLng(minLat - latPadding, minLng));
    bounds.extend(new window.kakao.maps.LatLng(maxLat + latPadding, maxLng));

    // 마커 생성
    coordinates.forEach(
      ({ lat, lng, isMyLocation, roadNameAddress, isSelected }) => {
        placeMarker(
          lat,
          lng,
          mapRef.current,
          isMyLocation,
          roadNameAddress,
          isSelected,
        );
      },
    );

    if (coordinates.length > 0) {
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.setBounds(bounds);
        }
      }, 100);
    }
  };

  const initMap = () => {
    if (!containerRef.current || mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.556328, 126.923634),
      level: 2,
    };

    const map = new window.kakao.maps.Map(containerRef.current, options);
    mapRef.current = map;
    updateMap();
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const checkContainer = () => {
          if (containerRef.current && containerRef.current.offsetHeight > 0) {
            initMap();
          } else {
            setTimeout(checkContainer, 100);
          }
        };
        checkContainer();
      });
    }
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

          setTimeout(() => {
            if (coordinates.length > 0) {
              const bounds = new window.kakao.maps.LatLngBounds();
              let minLat = Infinity;
              let maxLat = -Infinity;
              let minLng = Infinity;
              let maxLng = -Infinity;

              coordinates.forEach(({ lat, lng }) => {
                minLat = Math.min(minLat, lat);
                maxLat = Math.max(maxLat, lat);
                minLng = Math.min(minLng, lng);
                maxLng = Math.max(maxLng, lng);
              });

              const latPadding = (maxLat - minLat) * 0.1;
              bounds.extend(
                new window.kakao.maps.LatLng(minLat - latPadding, minLng),
              );
              bounds.extend(
                new window.kakao.maps.LatLng(maxLat + latPadding, maxLng),
              );

              mapRef.current.setBounds(bounds);
            }
          }, 100);
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
