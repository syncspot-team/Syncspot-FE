import { useState, useEffect } from 'react';
import { useDebounce } from '@src/hooks/useDebounce';
import { searchPlacesByKeyword } from '@src/apis/kakao/searchPlacesByKeyword';
import { Place } from './types';

interface IKakaoLocationSearch {
  onPlaceSelect: (place: Place) => void;
}

export default function KakaoLocationSearch({
  onPlaceSelect,
}: IKakaoLocationSearch) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchPlaces = async (query: string) => {
    const documents = await searchPlacesByKeyword(query);
    setSuggestions(documents);
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchPlaces(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="장소를 검색하세요"
        className="w-full py-[1.3125rem] px-[1.5rem] rounded-default h-[3.75rem] placeholder:text-gray-normal"
        autoFocus
      />

      <div className="max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {suggestions.map((place) => (
          <div
            key={place.id}
            onClick={() => onPlaceSelect(place)}
            className="p-3 truncate rounded-lg cursor-pointer hover:bg-gray-light"
          >
            <div className="text-content">{place.place_name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
