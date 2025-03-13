import { useState } from 'react';
import { IShare } from './Kakao';

export default function Copied({ url }: IShare) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full py-2 lg:py-4">
      <span className="px-1 mb-2 lg:px-2 text-gray-dark lg:pl-4">
        클릭하여 링크 복사
      </span>
      <button
        onClick={handleCopyLink}
        className="relative flex flex-col w-full text-left rounded-lg bg-gray-light"
      >
        <span className="block px-1 py-2 overflow-x-scroll truncate lg:py-4 lg:px-4 scrollbar-hide whitespace-nowrap text-blue-dark03">
          {url}
        </span>
        {isCopied && (
          <span className="absolute -bottom-6 left-3 text-primary ">
            링크가 복사되었습니다.
          </span>
        )}
      </button>
    </div>
  );
}
