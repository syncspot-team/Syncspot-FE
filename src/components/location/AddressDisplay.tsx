import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import IconXmark from '@src/assets/icons/IconXmark.svg?react';
import { useState, useRef, useEffect } from 'react';

interface IAddressPopupProps {
  address: string;
  onClose: () => void;
}

const AddressPopup = ({ address, onClose }: IAddressPopupProps) => (
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

interface IAddressDisplayProps {
  address: string;
}

export default function AddressDisplay({ address }: IAddressDisplayProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const addressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = addressRef.current;
    if (!element) return;

    const checkTruncation = () => {
      if (element) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);
    checkTruncation();

    return () => resizeObserver.unobserve(element);
  }, []);

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
