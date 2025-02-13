import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';

interface IProfileFormData {
  nickname: string;
  email: string;
}

const BUTTON_STYLES = {
  primary:
    'px-4 py-1 font-semibold rounded-default text-description lg:text-content text-white-default bg-primary hover:bg-secondary',
  secondary:
    'px-4 py-1 font-semibold border rounded-default text-primary border-primary text-description lg:text-content',
};

export default function UserProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [initialNickname, setInitialNickname] = useState<string | null>(null);
  const [initialEmail, setInitialEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit: handleSubmitProfile,
    reset,
  } = useForm<IProfileFormData>();

  useEffect(() => {
    setInitialNickname('syncspot');
    setInitialEmail('syncspot@gmail.com');
    reset({
      nickname: 'syncspot',
      email: 'syncspot@gmail.com',
    });
  }, []);

  const handleProfileSave = (data: IProfileFormData) => {
    if (data.nickname !== initialNickname) {
      // 닉네임 변경 API 호출
    }

    if (data.email !== initialEmail) {
      // 이메일 변경 API 호출
    }

    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmitProfile(handleProfileSave)}>
      <div className="flex items-center justify-between mt-0 mb-5 lg:mt-4">
        <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
          개인정보
        </h2>
        <div className="flex items-center gap-2">
          {renderProfileInfoEditButtons()}
        </div>
      </div>
      <label className="ml-[0.375rem] text-content-bold">닉네임</label>
      <Input
        {...register('nickname')}
        disabled={!isEditing}
        className={`w-full mt-[0.125rem] mb-4 ${isEditing ? 'bg-white-default ring-1 ring-primary' : 'bg-gray-light cursor-not-allowed'}`}
      />
      <label className="ml-[0.375rem] text-content-bold">아이디(이메일)</label>
      <Input
        {...register('email')}
        type="email"
        disabled={!isEditing}
        className={`w-full mt-[0.125rem] ${isEditing ? 'bg-white-default ring-1 ring-primary' : 'bg-gray-light cursor-not-allowed'}`}
      />
    </form>
  );

  function renderProfileInfoEditButtons() {
    return isEditing ? (
      <>
        <button type="submit" className={BUTTON_STYLES.primary}>
          완료
        </button>
        <button
          type="button"
          className={BUTTON_STYLES.secondary}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          취소
        </button>
      </>
    ) : (
      <button
        type="button"
        className={BUTTON_STYLES.primary}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          setIsEditing(true);
        }}
      >
        수정
      </button>
    );
  }
}
