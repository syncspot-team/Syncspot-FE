import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { searchAddressInfo } from '@src/apis/kakao/searchAddressInfo';
import { Place, ISelectedLocation } from '@src/components/common/kakao/types';
import { useDebounce } from '@src/hooks/useDebounce';
import { searchPlacesByKeyword } from '@src/apis/kakao/searchPlacesByKeyword';
import { Input } from '@src/components/common/input/Input';

const NO_RESULTS_MESSAGE = '검색 결과가 존재하지 않습니다';

const SUGGESTIONS_WRAPPER_CLASS =
  'max-h-[9.375rem] lg:max-h-[15.625rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full';
const SUGGESTION_ITEM_CLASS =
  'py-[1.125rem] pl-[0.9375rem] truncate rounded-md cursor-pointer hover:bg-gray-light';
const PORTAL_WRAPPER_CLASS =
  'fixed z-[100] rounded-md shadow-lg bg-white-default mt-1';
const NON_PORTAL_WRAPPER_CLASS =
  'absolute z-[100] w-full mt-1 rounded-md shadow-lg bg-white-default';

interface IKakaoLocationPicker {
  InputClassName?: string;
  onSelect?: (location: ISelectedLocation) => boolean;
  defaultAddress?: string;
  usePortal?: boolean;
}

interface ISuggestionsListProps {
  suggestions: Place[];
  onSelect: (place: Place) => void;
}

const SuggestionsList = ({ suggestions, onSelect }: ISuggestionsListProps) => (
  <div className={SUGGESTIONS_WRAPPER_CLASS}>
    {suggestions.length > 0 ? (
      suggestions.map((place) => (
        <div
          key={place.id}
          onClick={() => onSelect(place)}
          className={SUGGESTION_ITEM_CLASS}
        >
          <div className="text-description">{place.place_name}</div>
        </div>
      ))
    ) : (
      <div className="p-4 text-center text-description">
        {NO_RESULTS_MESSAGE}
      </div>
    )}
  </div>
);

export default function KakaoLocationPicker({
  InputClassName,
  onSelect,
  defaultAddress,
  usePortal = true,
}: IKakaoLocationPicker) {
  const containerRef = useRef<HTMLDivElement>(null);
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
  };

  const searchPlaces = async (query: string) => {
    const documents = await searchPlacesByKeyword(query);
    setSuggestions(documents);
  };

  useEffect(() => {
    if (isSearching) {
      const resizeObserver = new ResizeObserver(() => {
        updateContainerWidth();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isSearching, updateContainerWidth]);

  useEffect(() => {
    if (debouncedSearchTerm && isSearching) {
      searchPlaces(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, isSearching]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
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
              className={PORTAL_WRAPPER_CLASS}
              style={{
                width: `${containerWidth}px`,
                left: containerRef.current?.getBoundingClientRect().left ?? 0,
                top:
                  (containerRef.current?.getBoundingClientRect().bottom ?? 0) +
                  window.scrollY,
              }}
            >
              <SuggestionsList
                suggestions={suggestions}
                onSelect={handlePlaceSelect}
              />
            </div>,
            document.body,
          )
        ) : (
          <div className={NON_PORTAL_WRAPPER_CLASS}>
            <SuggestionsList
              suggestions={suggestions}
              onSelect={handlePlaceSelect}
            />
          </div>
        ))}
    </div>
  );
}
