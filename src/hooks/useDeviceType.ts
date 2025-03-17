import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  LAPTOP: 1024, // Tailwindcss의 lg 브레이크포인트
} as const;

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < BREAKPOINTS.LAPTOP,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.LAPTOP);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
}
