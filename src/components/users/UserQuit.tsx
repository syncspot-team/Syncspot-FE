import IconWarningTriangle from '@src/assets/icons/IconWarningTriangle.svg?react';
import Button from '../common/button/Button';
import { useState } from 'react';

export default function UserQuit() {
  const [quitReason, setQuitReason] = useState('');

  const handleQuit = () => {
    // 탈퇴 로직 처리
  };

  return (
    <div className="flex flex-col h-full lg:px-20">
      <h3 className="my-4 mb-8 ml-1 lg:mt-0 lg:ml-0 text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
        회원 탈퇴
      </h3>

      <div className="flex flex-col gap-6">
        <h4 className="font-semibold text-menu lg:text-subtitle">
          정말 탈퇴하시겠어요?
        </h4>

        <div className="flex flex-col gap-3 text-description lg:text-content text-primary">
          <div className="flex items-start gap-2">
            <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
            <p>
              지금 탈퇴하시면 이전에 참여했던 모임들의 기록은 볼 수 없습니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
            <p>
              지금 탈퇴하시면 해당 계정으로 이용했던 내역은 모두 삭제되며,
              복구할 수 없습니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IconWarningTriangle className="flex-shrink-0 size-5 lg:mt-0.5" />
            <p>
              지금 탈퇴하시면 30일 이내 재가입이 불가하며 서비스 이용이
              제한됩니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold underline text-content lg:text-menu">
            떠나시는 이유를 알려주세요
          </p>
          <p className="text-description lg:text-content text-gray-dark whitespace-nowrap">
            싱크스팟을 아끼고 사랑해주신 시간에 감사드립니다.
            <br />
            서비스를 이용하며 느끼셨던 점을 저희에게 공유해주시면
            <br />
            더욱 유용한 서비스를 제공할 수 있는 싱크스팟이 되도록
            노력하겠습니다.
          </p>
          <textarea
            className="w-full h-32 p-4 mt-4 rounded-lg resize-none bg-gray-light"
            placeholder="탈퇴 사유를 입력해주세요"
            value={quitReason}
            onChange={(e) => setQuitReason(e.target.value)}
          />
        </div>

        <Button
          buttonType="quit"
          className="w-full"
          onClick={handleQuit}
          disabled={!quitReason.trim()}
        >
          계정 삭제하기
        </Button>
      </div>
    </div>
  );
}
