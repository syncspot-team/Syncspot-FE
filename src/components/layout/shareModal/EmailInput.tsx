import { Input } from '@src/components/common/input/Input';
import { useEmailShare } from '@src/hooks/share/useEmailShare';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useState } from 'react';

interface IEmailInputProps {
  url: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function EmailInput({ url, onClick }: IEmailInputProps) {
  const [toEmail, setToEmail] = useState('');

  const { sendEmail, loading, error, success } = useEmailShare();

  const handleEmailShare = () => {
    const message = `${url}\n\nsyncspot\nMORAK team`;
    sendEmail({ toEmail, message });
    setToEmail('');
  };

  return (
    <>
      <div className="flex justify-between w-full h-10 gap-2 lg:h-14 text-description">
        <Input
          type="email"
          placeholder="받는 사람 이메일 주소"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="flex-1 py-2 border lg:py-4"
        />
        <button
          onClick={handleEmailShare}
          disabled={loading}
          className={mergeClassNames(
            'rounded-lg lg:w-14 w-10 text-white-default bg-blue-normal01',
            { loading: 'bg-gray-light' },
          )}
        >
          {loading ? '...' : '전송'}
        </button>
        <div onClick={onClick} className="my-auto cursor-pointer">
          X
        </div>
      </div>
      {error && <div className="text-red-normal">{error}</div>}

      {success && (
        <div className="text-blue-dark01">이메일이 전송되었습니다!</div>
      )}
    </>
  );
}
