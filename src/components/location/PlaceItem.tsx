import IconLinkPin from '@src/assets/icons/IconLinkPin.svg?react';
import IconStudy from '@src/assets/icons/IconStudy.svg?react';
import IconCafe from '@src/assets/icons/IconCafe.svg?react';
import IconRestaurant from '@src/assets/icons/IconRestaurant.svg?react';
import { Link } from 'react-router-dom';
import { IPlaceContent } from '@src/types/location/recommendPlaceSearchResponseType';
import AddressDisplay from './AddressDisplay';

interface IPlaceItemProps {
  place: IPlaceContent;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

export default function PlaceItem({
  place,
  isSelected,
  onSelect,
}: IPlaceItemProps) {
  const PLACE_ICONS = {
    STUDY: IconStudy,
    CAFE: IconCafe,
    RESTAURANT: IconRestaurant,
  } as const;

  const getPlaceIcon = () => {
    const Icon = PLACE_ICONS[place.placeStandard as keyof typeof PLACE_ICONS];
    return Icon ? <Icon className="size-5" /> : null;
  };

  return (
    <li
      className={`flex flex-col justify-center p-4 pb-[0.625rem] cursor-pointer rounded-[0.625rem] shadow-sm ${
        isSelected
          ? 'bg-blue-100 opacity-95 ring-2 ring-blue-normal01'
          : 'ring-1 ring-primary'
      }`}
      onClick={() => onSelect(place.name)}
    >
      <div className="flex items-center gap-2">
        <span className="flex-shrink-0">{getPlaceIcon()}</span>
        <span className="text-content text-blue-dark02">
          {place.roadNameAddress}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[1.25rem] text-blue-dark01 my-1">
          {place.name}
        </span>
        {isSelected && (
          <Link to={place.placeUrl} target="_blank">
            <IconLinkPin className="flex-shrink-0 size-4 hover:scale-110" />
          </Link>
        )}
      </div>
      {isSelected && (
        <div className="flex items-center gap-2">
          {place.distance && (
            <span className="px-2 py-1 rounded-lg bg-primary text-white-default text-description">
              {`내 위치로부터 ${place.distance}m`}
            </span>
          )}
          {place.phoneNumber && (
            <span className="px-2 py-1 rounded-lg bg-primary text-white-default text-description">
              {place.phoneNumber}
            </span>
          )}
        </div>
      )}
      <div className="mt-auto">
        <AddressDisplay address={place.siGunGu} />
      </div>
    </li>
  );
}
