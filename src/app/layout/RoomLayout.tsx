import { Outlet } from 'react-router-dom';
import { RoomCheck } from '@src/app/layout';

export default function RoomLayout() {
  return (
    <RoomCheck>
      <Outlet />
    </RoomCheck>
  );
}
