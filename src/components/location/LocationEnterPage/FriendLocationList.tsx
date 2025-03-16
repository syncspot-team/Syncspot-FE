import { useLocationContext } from '@src/components/location/LocationEnterPage/LocationContext';

interface FriendLocationListProps {
  className?: string;
}

export default function FriendLocationList({
  className,
}: FriendLocationListProps) {
  const { friendLocationFields } = useLocationContext();

  return (
    <ul className={className}>
      {friendLocationFields.map((location) => (
        <li
          key={location.id}
          className="p-3 mb-2 rounded-default bg-white-default lg:py-[1.25rem] cursor-not-allowed lg:ring-0 ring-1 ring-gray-normal"
        >
          <p className="truncate text-gray-dark text-description lg:text-content">
            {location.roadNameAddress}
          </p>
        </li>
      ))}
    </ul>
  );
}
