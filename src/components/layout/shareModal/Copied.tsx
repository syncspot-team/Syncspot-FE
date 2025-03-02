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
    <div className="flex flex-col w-full ">
      <span className="ml-3 text-gray-dark">클릭하여 링크 복사</span>
      <button
        onClick={handleCopyLink}
        className="relative flex flex-col w-full p-3 text-left rounded-lg hover:bg-gray-light"
      >
        <span className="block overflow-x-scroll scrollbar-hide whitespace-nowrap text-gray-dark">
          {url}
        </span>
        {isCopied && (
          <span className="absolute -bottom-6 left-3 text-primary ">
            링크가 복사되었습니다
          </span>
        )}
      </button>
    </div>
  );
}
