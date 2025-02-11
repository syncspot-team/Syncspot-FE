import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { PATH } from '@src/constants/path';
import AddressDisplay from './AddressDisplay';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';

interface IMidpointListItemProps {
  location: IMidpointDataResponseType;
  index: number;
  isSelected: boolean;
  placeSearchData: IPlaceSearchResponseType;
  sequence: string;
  timeSearchData?: {
    data?: {
      elements: {
        distance: { text: string };
        duration: { text: string };
      }[];
    };
  };
  isTimeSearchLoading: boolean;
  onSelect: () => void;
}

export default function MidpointListItem({
  location,
  index,
  isSelected,
  placeSearchData,
  sequence,
  timeSearchData,
  isTimeSearchLoading,
  onSelect,
}: IMidpointListItemProps) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const address = location.roadNameAddress || '위치 정보 없음';
  const myLocationName =
    placeSearchData?.data?.myLocations?.[0]?.roadNameAddress;

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { addressLat, addressLong, name } = location;
    navigate(
      PATH.LOCATION_RECOMMENDATIONS(roomId) +
        `?lat=${addressLat}&lng=${addressLong}&location=${name}`,
    );
  };

  return (
    <li
      className={`flex flex-col justify-center h-full max-h-[8.75rem] p-4 cursor-pointer rounded-default shadow-sm ${
        isSelected
          ? 'bg-blue-100 opacity-95 ring-2 ring-blue-normal01'
          : 'ring-1 ring-primary'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center -mt-[0.0625rem] rounded-full text-white-default bg-blue-dark01 size-6">
            {index + 1}
          </span>
          <span className="text-blue-dark02 text-content">
            우리의 {sequence} 번째 중간 지점
          </span>
        </span>
        <IconRightHalfArrow
          onClick={handleNavigate}
          className={`${
            isSelected ? 'opacity-100' : 'opacity-0'
          } rounded-[0.4375rem] p-1 text-primary hover:bg-gray-light hover:scale-110`}
        />
      </div>
      <div className="flex items-center my-[0.125rem]">
        <h3 className="truncate text-blue-dark01 text-subtitle">
          {location.name}
        </h3>
      </div>
      {isSelected ? (
        <div className="flex flex-col gap-1">
          {!isTimeSearchLoading && timeSearchData?.data?.elements[0] && (
            <div className="flex items-center gap-2">
              {timeSearchData.data.elements[0].distance?.text && (
                <span className="px-2 py-1 rounded-md bg-primary text-description text-white-default">
                  {`${myLocationName}에서 ${timeSearchData.data.elements[0].distance.text}`}
                </span>
              )}
              {timeSearchData.data.elements[0].duration?.text && (
                <span className="px-2 py-1 rounded-md bg-primary text-description text-white-default">
                  {`${timeSearchData.data.elements[0].duration.text}`}
                </span>
              )}
            </div>
          )}
          <AddressDisplay address={address} />
        </div>
      ) : (
        <AddressDisplay address={address} />
      )}
    </li>
  );
}
