import { useEffect } from 'react';

export function useResponsiveClose(breakpoint: number, handler: () => void) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        handler();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, handler]);
}
