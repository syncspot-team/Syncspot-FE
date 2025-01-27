import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import IconInstagram from '@src/assets/icons/IconInstagram.svg?react';
import IconEmail from '@src/assets/icons/IconEmail.svg?react';
import { useState } from 'react';

interface IShareMeetingModalProps {
  onClose: () => void;
}

export default function ShareMeetingModal({
  onClose,
}: IShareMeetingModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // 2초 후 메시지 사라짐
  };

  return (
    <div className="flex flex-col items-center w-[17.5rem] lg:w-[25rem]">
      <h2 className="mb-6 text-subtitle lg:text-title text-tertiary">
        모임 공유하기
      </h2>

      <div className="flex flex-col w-full gap-3">
        <button className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light">
          <IconOauthKakao className="size-6" />
          <span>카카오톡</span>
        </button>

        <button className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light">
          <IconInstagram className="size-6" />
          <span>인스타그램</span>
        </button>

        <button className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light">
          <IconEmail className="size-6" />
          <span>이메일</span>
        </button>

        <div className="flex flex-col w-full text-description">
          <span className="ml-3 text-description text-gray-dark">
            클릭하여 링크 복사
          </span>
          <button
            onClick={handleCopyLink}
            className="relative flex flex-col w-full p-3 text-left rounded-lg hover:bg-gray-light"
          >
            <span className="truncate text-gray-dark text-description">
              {window.location.href}
            </span>
            {isCopied && (
              <span className="absolute -bottom-5 left-3 text-primary text-description">
                링크가 복사되었습니다
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full p-3 mt-4 rounded-lg bg-gray-light hover:bg-gray-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
