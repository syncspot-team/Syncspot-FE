import { useEffect, RefObject } from 'react';

interface UseAutoScrollProps {
  lastLocationRef: RefObject<HTMLLIElement>;
  locationListRef: RefObject<HTMLUListElement>;
  currentLocationsCount: number;
  savedLocationsCount: number;
}

export function useAutoScroll({
  lastLocationRef,
  locationListRef,
  currentLocationsCount,
  savedLocationsCount,
}: UseAutoScrollProps) {
  useEffect(() => {
    if (
      lastLocationRef.current &&
      currentLocationsCount > savedLocationsCount
    ) {
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        lastLocationRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        locationListRef.current?.scrollTo({
          top: locationListRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [currentLocationsCount, savedLocationsCount]);
}
