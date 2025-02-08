import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';

interface AddressPopupProps {
  address: string;
  onClose: () => void;
}

const AddressPopup = ({ address, onClose }: AddressPopupProps) => (
  <div className="absolute left-0 z-10 w-full p-2 mt-1 rounded-lg shadow-md top-full bg-white-default">
    <div className="flex items-start gap-2">
      <span className="px-2 py-1 rounded-lg text-description bg-gray-light whitespace-nowrap">
        주소
      </span>
      <span className="text-description text-gray-dark grow">{address}</span>
      <button onClick={onClose} className="flex-shrink-0 mt-[0.125rem]">
        <IconXmark className="size-4 text-gray-dark" />
      </button>
    </div>
  </div>
);

interface AddressDisplayProps {
  address: string;
  addressRef: React.RefObject<HTMLSpanElement>;
  isTruncated: boolean;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function AddressDisplay({
  address,
  addressRef,
  isTruncated,
  isExpanded,
  setIsExpanded,
}: AddressDisplayProps) {
  return (
    <div className="relative flex items-center">
      <span ref={addressRef} className="truncate text-gray-dark">
        {address || '위치 정보 없음'}
      </span>
      {isTruncated && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="flex-shrink-0 ml-1"
          >
            <IconDropdown
              className={`size-4 text-gray-dark ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {isExpanded && (
            <AddressPopup
              address={address || '위치 정보 없음'}
              onClose={() => setIsExpanded(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
