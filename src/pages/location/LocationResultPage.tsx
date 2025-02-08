import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useMemo } from 'react';
import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import IconLinkPin from '@src/assets/icons/IconLinkPin.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useMidpointSearchQuery } from '@src/state/queries/location/useMidpointSearchQuery';
import { useGetPlaceSearchQuery } from '@src/state/queries/location/useGetPlaceSearchQuery';
import { IMidpointDataResponseType } from '@src/types/location/midpointSearchResponseType';
import { useMidpointTimeSearchQuery } from '@src/state/queries/location/useMidpointTimeSearchQuery';
import SomethingWrongErrorPage from '../error/SomethingWrongErrorPage';

interface Coordinate {
  lat: number;
  lng: number;
  isMyLocation: boolean;
  roadNameAddress: string;
  name: string;
  siGunGu: string;
  isSelected?: boolean;
}

export default function LocationResultPage() {
  const SEQUENCE = ['첫', '두', '세', '네', '다섯'];
  const navigate = useNavigate();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
  const { roomId } = useParams();

  const { data: placeSearchData } = useGetPlaceSearchQuery();
  const { data: midpointSearchData } = useMidpointSearchQuery();

  const selectedMidpoint = midpointSearchData?.data[selectedLocationIndex];
  const { data: timeSearchData, isLoading: isTimeSearchLoading } =
    useMidpointTimeSearchQuery(
      selectedMidpoint?.addressLat || 0,
      selectedMidpoint?.addressLong || 0,
      {
        enabled:
          !!selectedMidpoint &&
          selectedMidpoint.addressLat !== 0 &&
          selectedMidpoint.addressLong !== 0,
      },
    );

  const coordinates = useMemo<Coordinate[]>(() => {
    if (!placeSearchData?.data || !midpointSearchData?.data) return [];

    const myLocations = placeSearchData.data.myLocationExistence
      ? [
          {
            lat: placeSearchData.data.myLocations[0].addressLat,
            lng: placeSearchData.data.myLocations[0].addressLong,
            isMyLocation: true,
            roadNameAddress:
              placeSearchData.data.myLocations[0].roadNameAddress,
            name: '내 위치',
            siGunGu: '',
          },
        ]
      : [];

    const midpointLocations = midpointSearchData.data.map(
      (location: IMidpointDataResponseType, index: number) => ({
        lat: location.addressLat,
        lng: location.addressLong,
        isMyLocation: false,
        roadNameAddress: location.name || '위치 정보 없음',
        name: location.name,
        siGunGu: `${location.siDo} ${location.siGunGu}`,
        isSelected: index === selectedLocationIndex,
      }),
    );

    return [...myLocations, ...midpointLocations];
  }, [selectedLocationIndex, placeSearchData, midpointSearchData]);

  const handleClickMidpoint = (location: IMidpointDataResponseType) => {
    const { addressLat, addressLong, roadNameAddress } = location;
    navigate(
      PATH.LOCATION_RECOMMENDATIONS(roomId) +
        `?lat=${addressLat}&lng=${addressLong}&location=${roadNameAddress}`,
    );
  };

  if (!midpointSearchData) return <SomethingWrongErrorPage />;

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-10 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.5625rem]">
      <div className="rounded-default min-h-[40.625rem] lg:col-span-6">
        <KakaoMap coordinates={coordinates} />
      </div>
      <div className="lg:col-span-4">
        <ul className="grid grid-cols-1 grid-rows-5 h-full gap-[0.625rem]">
          {midpointSearchData.data.map(
            (location: IMidpointDataResponseType, index: number) => (
              <li
                key={index}
                className={`flex flex-col justify-center h-full max-h-[140px] p-4 cursor-pointer rounded-default shadow-sm ${
                  selectedLocationIndex === index
                    ? 'bg-blue-100 opacity-95 ring-2 ring-blue-normal01'
                    : 'bg-gray-light'
                }`}
                onClick={() => setSelectedLocationIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center -mt-[0.0625rem] rounded-full text-white-default bg-blue-dark01 size-6">
                      {index + 1}
                    </span>
                    <span className="text-blue-dark02 text-content">
                      우리의 {SEQUENCE[index]} 번째 중간 지점
                    </span>
                  </span>
                  <IconRightHalfArrow
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickMidpoint(location);
                    }}
                    className={`${
                      selectedLocationIndex === index
                        ? 'opacity-100'
                        : 'opacity-0'
                    } rounded-[0.4375rem] p-1 mr-2 text-primary hover:bg-gray-light hover:scale-110`}
                  />
                </div>
                <div className="flex items-center gap-4 my-1">
                  <span className="truncate text-blue-dark01 text-subtitle">
                    {location.name}
                  </span>
                  <IconLinkPin className="flex-shrink-0 size-[1.125rem]" />
                </div>
                {selectedLocationIndex === index ? (
                  <div className="flex flex-col gap-1">
                    {!isTimeSearchLoading &&
                      timeSearchData?.data?.elements[0] && (
                        <div className="flex gap-2">
                          <span className="px-2 py-1 rounded-md bg-primary text-description text-white-default">
                            {timeSearchData.data.elements[0].distance.text}
                          </span>
                          <span className="px-2 py-1 rounded-md bg-primary text-description text-white-default">
                            {timeSearchData.data.elements[0].duration.text}
                          </span>
                        </div>
                      )}
                    <span className="truncate text-gray-dark">
                      {location.roadNameAddress || '위치 정보 없음'}
                    </span>
                  </div>
                ) : (
                  <span className="mt-1 truncate text-gray-dark">
                    {location.roadNameAddress || '위치 정보 없음'}
                  </span>
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
