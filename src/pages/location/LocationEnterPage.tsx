import { useDeviceType } from '@src/hooks/useDeviceType';
import DesktopLocationEnter from '@src/components/location/LocationEnterPage/DesktopLocationEnter';
import MobileLocationEnter from '@src/components/location/LocationEnterPage/MobileLocationEnter';
import { LocationProvider } from '@src/components/location/LocationEnterPage/LocationContext';

export default function LocationEnterPage() {
  const { isMobile } = useDeviceType();

  return (
    <LocationProvider>
      {isMobile ? <MobileLocationEnter /> : <DesktopLocationEnter />}
    </LocationProvider>
  );
}
