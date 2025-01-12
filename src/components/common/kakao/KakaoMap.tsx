/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

interface IKakaoMap {
  coordinates: {
    lat: number;
    lng: number;
    isMyLocation: boolean;
    roadNameAddress: string;
  }[];
}

export default function KakaoMap({ coordinates }: IKakaoMap) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);

  const placeMarker = (
    lat: number,
    lng: number,
    map: any,
    isMyLocation: boolean,
    roadNameAddress: string,
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
    addressContent.className =
      'absolute flex items-center justify-center px-3 py-2 border shadow-md bg-white-default -top-10 border-primary rounded-default whitespace-nowrap';
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

    coordinates.forEach(({ lat, lng, isMyLocation, roadNameAddress }) => {
      placeMarker(lat, lng, mapRef.current, isMyLocation, roadNameAddress);

      const coords = new window.kakao.maps.LatLng(lat, lng);
      bounds.extend(coords);
    });

    if (coordinates.length > 0) {
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.setBounds(bounds);
        }
      }, 500);
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

  return <div ref={containerRef} className="w-full h-full rounded-2xl" />;
}
