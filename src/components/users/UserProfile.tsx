import { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import { useModal } from '@src/hooks/useModal';
import { MODAL_TYPE } from '@src/types/modalType';
import Modal from '@src/components/common/modal/Modal';
import PasswordChangeModal from '@src/components/common/modal/PasswordChangeModal';

interface IProfileFormData {
  nickname: string;
  email: string;
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/favicon.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { modalType, openModal, closeModal } = useModal();

  const { register: registerProfile, handleSubmit: handleSubmitProfile } =
    useForm<IProfileFormData>({
      defaultValues: {
        nickname: 'syncspot',
        email: 'syncspot@gmail.com',
      },
    });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // API 호출하여 이미지 업로드하는 과정 추가
    }
  };

  const handlePersonInfoSave = async (data: IProfileFormData) => {
    console.log('저장된 정보:', data);
    // API 호출하여 서버에 변경사항 저장
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleStartEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        <h3 className="my-4 mb-8 ml-1 lg:mt-0 lg:ml-0 text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
          프로필 수정
        </h3>

        <div className="flex items-center gap-20 mb-10">
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="rounded-full size-24"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            className="hidden"
          />
          <button
            className="px-4 py-2 font-semibold rounded-full text-description lg:text-content text-white-default bg-primary hover:bg-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            변경
          </button>
        </div>

        <form onSubmit={handleSubmitProfile(handlePersonInfoSave)}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
              개인정보
            </h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="px-4 py-1 font-semibold rounded-default text-description lg:text-content text-white-default bg-primary hover:bg-secondary"
                  >
                    완료
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1 font-semibold border rounded-default text-primary border-primary text-description lg:text-content"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="px-4 py-1 font-semibold rounded-default text-white-default bg-primary hover:bg-secondary text-description lg:text-content"
                  onClick={handleStartEdit}
                >
                  수정
                </button>
              )}
            </div>
          </div>
          <label className="ml-[0.375rem] text-content-bold">닉네임</label>
          <Input
            {...registerProfile('nickname')}
            disabled={!isEditing}
            className={`w-full mb-2 ${!isEditing ? 'bg-gray-light cursor-not-allowed' : 'bg-white-default ring-1 ring-gray-normal'}`}
          />
          <label className="ml-[0.375rem] text-content-bold">
            아이디(이메일)
          </label>
          <Input
            {...registerProfile('email')}
            type="email"
            disabled={!isEditing}
            className={`w-full ${!isEditing ? 'bg-gray-light cursor-not-allowed' : 'bg-white-default ring-1 ring-gray-normal'}`}
          />
        </form>

        <div className="flex items-center justify-between mt-10">
          <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold mb-3">
            비밀번호
          </h2>
          <button
            type="button"
            className="px-4 py-1 font-semibold rounded-default text-white-default bg-primary hover:bg-secondary text-description lg:text-content"
            onClick={() => openModal(MODAL_TYPE.PASSWORD_CHANGE_MODAL)}
          >
            비밀번호 변경하기
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalType === MODAL_TYPE.PASSWORD_CHANGE_MODAL}
        onClose={closeModal}
      >
        <PasswordChangeModal onClose={closeModal} />
      </Modal>
    </>
  );
}
