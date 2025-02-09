import { IPlaceContent } from '@src/types/location/recommendPlaceSearchResponseType';
import PlaceItem from './PlaceItem';
import Pagination from './Pagination';

interface PlaceListProps {
  recommendPlaces: IPlaceContent[];
  selectedPlace: string | null;
  currentPage: number;
  totalPages: number;
  onPlaceSelect: (name: string) => void;
  onPageChange: (page: number) => void;
}

export default function PlaceList({
  recommendPlaces,
  selectedPlace,
  currentPage,
  totalPages,
  onPlaceSelect,
  onPageChange,
}: PlaceListProps) {
  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 grid grid-cols-1 gap-[0.625rem]">
        {recommendPlaces.map((place, index) => (
          <PlaceItem
            key={index}
            place={place}
            isSelected={selectedPlace === place.name}
            onSelect={onPlaceSelect}
          />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
