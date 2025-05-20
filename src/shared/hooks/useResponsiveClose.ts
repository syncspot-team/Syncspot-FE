import { useEffect } from 'react';

export function useResponsiveClose(breakpoint: number, callback: () => void) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        callback();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, callback]);
}
