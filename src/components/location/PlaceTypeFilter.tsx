import { FILTER_ITEMS } from './constants';

export const PLACE_STANDARDS = {
  ALL: 'ALL',
  STUDY: 'STUDY',
  CAFE: 'CAFE',
  RESTAURANT: 'RESTAURANT',
} as const;

export type PLACE_STANDARDS_TYPE =
  (typeof PLACE_STANDARDS)[keyof typeof PLACE_STANDARDS];

interface IPlaceTypeFilterProps {
  selectedType: PLACE_STANDARDS_TYPE;
  onTypeChange: (type: PLACE_STANDARDS_TYPE) => void;
}

export default function PlaceTypeFilter({
  selectedType,
  onTypeChange,
}: IPlaceTypeFilterProps) {
  return (
    <ul className="flex items-center gap-3 *:shadow-md *:px-3 *:py-1 *:rounded-[1.25rem] *:cursor-pointer [&_*]:transition-none">
      {FILTER_ITEMS.map(({ type, label, Icon }) => (
        <li
          key={type}
          className={`${Icon ? 'flex items-center gap-[0.375rem]' : ''} ${
            selectedType === type
              ? 'bg-primary text-white-default'
              : 'text-blue-dark02'
          } hover:scale-105`}
          onClick={() => onTypeChange(type)}
        >
          {Icon && <Icon className="size-4" />}
          <h3 className="text-content">{label}</h3>
        </li>
      ))}
    </ul>
  );
}
