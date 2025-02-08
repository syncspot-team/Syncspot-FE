import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { searchAddressInfo } from '@src/apis/kakao/searchAddressInfo';
import { Place, ISelectedLocation } from '@src/components/common/kakao/types';
import { useDebounce } from '@src/hooks/useDebounce';
import { searchPlacesByKeyword } from '@src/apis/kakao/searchPlacesByKeyword';
import { Input } from '@src/components/common/input/Input';

interface IKakaoLocationPicker {
  InputClassName?: string;
  onSelect?: (location: ISelectedLocation) => boolean;
  defaultAddress?: string;
  usePortal?: boolean;
}

export default function KakaoLocationPicker({
  InputClassName,
  onSelect,
  defaultAddress,
  usePortal = true,
}: IKakaoLocationPicker) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(defaultAddress || '');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const updateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerWidth(rect.width);
    }
  }, []);

  useEffect(() => {
    if (isSearching) {
      updateContainerWidth();
    }
  }, [isSearching, updateContainerWidth]);

  useEffect(() => {
    if (isSearching) {
      const resizeObserver = new ResizeObserver(() => {
        updateContainerWidth();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      const handleWindowResize = () => {
        requestAnimationFrame(() => {
          updateContainerWidth();
        });
      };

      window.addEventListener('resize', handleWindowResize);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, [isSearching, updateContainerWidth]);

  const handlePlaceSelect = async (place: Place) => {
    setIsSearching(false);
    const addressData = await searchAddressInfo(place.road_address_name);
    const location = { place, address: addressData };
    const selectResult = onSelect?.(location);
    if (selectResult) {
      setSearchTerm(place.place_name);
    } else {
      setSearchTerm(defaultAddress || '');
    }
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    updateContainerWidth();
  };

  const searchPlaces = async (query: string) => {
    const documents = await searchPlacesByKeyword(query);
    setSuggestions(documents);
  };

  useEffect(() => {
    if (debouncedSearchTerm && isSearching) {
      searchPlaces(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, isSearching]);

  const SuggestionsList = () => (
    <div className="max-h-[9.375rem] lg:max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
      {suggestions.length > 0 ? (
        suggestions.map((place) => (
          <div
            key={place.id}
            onClick={() => handlePlaceSelect(place)}
            className="py-[1.125rem] pl-[0.9375rem] truncate rounded-md cursor-pointer hover:bg-gray-light"
          >
            <div className="text-description">{place.place_name}</div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-description">
          검색 결과가 존재하지 않습니다
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="장소를 선택해주세요"
        className={`w-full ${InputClassName}`}
      />

      {isSearching &&
        containerWidth > 0 &&
        (usePortal ? (
          createPortal(
            <div
              className="fixed z-[100] rounded-md shadow-lg bg-white-default mt-1"
              style={{
                width: `${containerWidth}px`,
                left: containerRef.current?.getBoundingClientRect().left ?? 0,
                top:
                  (containerRef.current?.getBoundingClientRect().bottom ?? 0) +
                  window.scrollY,
              }}
            >
              <div className="max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
                <SuggestionsList />
              </div>
            </div>,
            document.body,
          )
        ) : (
          <div className="absolute z-[100] w-full mt-1 rounded-md shadow-lg bg-white-default">
            <SuggestionsList />
          </div>
        ))}
    </div>
  );
}
