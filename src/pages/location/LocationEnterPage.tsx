import { useDeviceType } from '@src/hooks/useDeviceType';
import DesktopLocationEnter from '@src/components/location/LocationEnterPage/DesktopLocationEnter';
import MobileLocationEnter from '@src/components/location/LocationEnterPage/MobileLocationEnter';

export default function LocationEnterPage() {
  const { isMobile } = useDeviceType();

  return isMobile ? <MobileLocationEnter /> : <DesktopLocationEnter />;
}
