import IconShareBox from '@src/assets/icons/IconShareBox.svg?react';
import IconOauthKakao from '@src/assets/icons/IconOauthKakao.svg?react';
import IconEmail from '@src/assets/icons/IconEmail.svg?react';
import { useState } from 'react';
import { useShareKakao } from '@src/hooks/share/useKakaoShare';
import { SHARE_TYPE, ShareType } from '@src/types/shareType';
import { PATH } from '@src/constants/path';
import { useEmailShare } from '@src/hooks/share/useEmailShare';
import { Input } from '../input/Input';
import { mergeClassNames } from '@src/utils/mergeClassNames';

interface IShareMeetingModalProps {
  onClose: () => void;
}

export default function ShareMeetingModal({
  onClose,
}: IShareMeetingModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [toEmail, setToEmail] = useState('');
  const [isEmailInput, setIsEmailInput] = useState(false);

  const url = window.location.href;
  const selectedRoomId = localStorage.getItem('selectedRoomId');
  const { sendEmail, loading, error, success } = useEmailShare();

  const pathToShareTypeMap: Record<string, ShareType> = {
    [PATH.LOCATION_ENTER(selectedRoomId!)]: SHARE_TYPE.LOCATION_ENTER,
    [PATH.LOCATION_RESULT(selectedRoomId!)]: SHARE_TYPE.LOCATION_RESULT,
    [PATH.LOCATION_RECOMMENDATIONS(selectedRoomId!)]:
      SHARE_TYPE.LOCATION_RECOMMENDATIONS,
    [PATH.PLACE_CREATE(selectedRoomId!)]: SHARE_TYPE.PLACE_CREATE,
    [PATH.PLACE_VOTE(selectedRoomId!)]: SHARE_TYPE.PLACE_VOTE,
    [PATH.PLACE_RESULT(selectedRoomId!)]: SHARE_TYPE.PLACE_RESULT,
    [PATH.TIME_CREATE(selectedRoomId!)]: SHARE_TYPE.TIME_CREATE,
    [PATH.TIME_VOTE(selectedRoomId!)]: SHARE_TYPE.TIME_VOTE,
    [PATH.TIME_RESULT(selectedRoomId!)]: SHARE_TYPE.TIME_RESULT,
    [PATH.ABOUT]: SHARE_TYPE.ABOUT,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKakaoShare = () => {
    const descriptionType = pathToShareTypeMap[window.location.pathname];
    if (descriptionType) {
      useShareKakao({ descriptionType, url });
    } else {
      console.error('매칭되는 SHARE_TYPE이 없습니다.');
    }
  };

  const handleEmailShare = () => {
    const message = `안녕하세요 \n\nSyncSpot 중간 지점 찾기 링크 공유합니다:\n\n${url}\n\nSyncSpot\nMORAK team`;
    sendEmail({ toEmail, message });
    setToEmail('');
  };

  return (
    <div className="flex flex-col items-center w-[17.5rem] lg:w-[25rem]">
      <IconShareBox />
      <h2 className="my-6 text-subtitle lg:text-title text-tertiary">
        모임 공유하기
      </h2>

      <div className="flex flex-col w-full gap-3 text-menu">
        <button
          className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light"
          onClick={handleKakaoShare}
        >
          <IconOauthKakao className="size-6" />
          <span>카카오톡</span>
        </button>
        {!isEmailInput && (
          <button
            className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light"
            onClick={() => setIsEmailInput(true)}
          >
            <IconEmail className="size-6" />
            <span>이메일</span>
          </button>
        )}
        {isEmailInput && (
          <>
            <div className="flex justify-between w-full gap-2">
              <Input
                type="email"
                placeholder="받는 사람 이메일 주소"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                className="flex-1 py-[0.86rem] border"
              />
              <button
                onClick={handleEmailShare}
                disabled={loading}
                className={mergeClassNames(
                  'rounded-lg w-12 text-white-default bg-blue-normal01',
                  { loading: 'bg-gray-light' },
                )}
              >
                {loading ? '...' : '전송'}
              </button>
              <div
                onClick={() => setIsEmailInput(false)}
                className="my-auto hover:cursor-pointer"
              >
                X
              </div>
            </div>
            {error && <div className="text-red-normal">{error}</div>}
            {success && (
              <div className="text-blue-dark01">이메일이 전송되었습니다!</div>
            )}
          </>
        )}

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
