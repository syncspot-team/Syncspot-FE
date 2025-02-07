import { Outlet } from 'react-router-dom';
import RoomCheck from '@src/components/common/routes/RoomCheck';

const RoomLayout = () => {
  return (
    <RoomCheck>
      <Outlet />
    </RoomCheck>
  );
};

export default RoomLayout;
