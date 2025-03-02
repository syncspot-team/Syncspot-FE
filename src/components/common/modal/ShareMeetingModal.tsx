import IconShareBox from '@src/assets/icons/IconShareBox.svg?react';

import { useState } from 'react';
import KakaoShare from '@src/components/layout/shareModal/Kakao';
import EmailButton from '@src/components/layout/shareModal/EmailButton';
import EmailInput from '@src/components/layout/shareModal/EmailInput';

interface IShareMeetingModalProps {
  onClose: () => void;
}

export default function ShareMeetingModal({
  onClose,
}: IShareMeetingModalProps) {
  const [isEmailInput, setIsEmailInput] = useState(false);

  const url = window.location.href;

  return (
    <div className="flex flex-col items-center w-[17.5rem] lg:w-[25rem]">
      <IconShareBox />
      <h2 className="my-2 text-menu-selected lg:text-title text-tertiary">
        모임 공유하기
      </h2>

      <div className="flex flex-col w-full gap-3 lg:text-content text-description">
        <KakaoShare url={url} />
        {!isEmailInput ? (
          <div onClick={() => setIsEmailInput(true)}>
            <EmailButton />
          </div>
        ) : (
          <EmailInput url={url} onClick={() => setIsEmailInput(false)} />
        )}

        <button
          onClick={onClose}
          className="w-full p-3 mt-4 bg-gray-200 rounded-lg hover:bg-gray-normal"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
