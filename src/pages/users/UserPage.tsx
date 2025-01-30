import { Outlet } from 'react-router-dom';

export default function UserPage() {
  return (
    <div className="grid grid-cols-10 gap-[0.9375rem] w-full px-4 lg:px-[7.5rem] mt-[1.875rem]">
      <div className="col-span-3 bg-gray-light rounded-default">123</div>
      <div className="col-span-7 bg-blue-500">123</div>
      <Outlet />
    </div>
  );
}
