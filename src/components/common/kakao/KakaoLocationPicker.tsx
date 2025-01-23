import { useState, useEffect } from 'react';
import { searchAddressInfo } from '@src/apis/kakao/searchAddressInfo';
import { Place, ISelectedLocation } from '@src/components/common/kakao/types';
import { useDebounce } from '@src/hooks/useDebounce';
import { searchPlacesByKeyword } from '@src/apis/kakao/searchPlacesByKeyword';
import { mergeClassNames } from '@src/utils/mergeClassNames';

interface IKakaoLocationPicker {
  className?: string;
  onSelect?: (location: ISelectedLocation) => boolean;
  defaultAddress?: string;
}

export default function KakaoLocationPicker({
  className,
  onSelect,
  defaultAddress,
}: IKakaoLocationPicker) {
  const [searchTerm, setSearchTerm] = useState(defaultAddress || '');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handlePlaceSelect = async (place: Place) => {
    setIsSearching(false);
    const addressData = await searchAddressInfo(place.road_address_name);
    const location = { place, address: addressData };
    const selectResult = onSelect?.(location);
    if (selectResult) {
      setSearchTerm(place.place_name);
    }
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  const searchPlaces = async (query: string) => {
    const documents = await searchPlacesByKeyword(query);
    setSuggestions(documents);
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim() && isSearching) {
      searchPlaces(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, isSearching]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="장소를 선택해주세요"
        className={mergeClassNames(
          'w-full cursor-pointer py-[1.125rem] pr-[1.5rem] pl-[0.9375rem] rounded-default',
          className,
        )}
      />

      {isSearching && (
        <div className="absolute z-50 w-full mt-[0.0625rem] rounded-default shadow-lg bg-white-default border-gray-light">
          <div className="max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {suggestions.length > 0 ? (
              suggestions.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handlePlaceSelect(place)}
                  className="py-[1.125rem] pr-[1.5rem] pl-[0.9375rem] truncate rounded-md cursor-pointer hover:bg-gray-light"
                >
                  <div className="text-content">{place.place_name}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-black-default">
                검색 결과가 존재하지 않습니다
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
