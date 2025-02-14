import { useState, useRef, ChangeEvent } from 'react';

export default function UserProfileImage() {
  const [profileImage, setProfileImage] = useState('/favicon.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex items-center gap-10 mb-10">
      <img
        src={profileImage}
        alt="프로필 이미지"
        className="rounded-full shadow-lg size-24"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
      />
      <button
        className="px-4 py-1 font-semibold rounded-full text-description lg:text-content text-white-default bg-primary hover:bg-secondary"
        onClick={() => fileInputRef.current?.click()}
      >
        변경
      </button>
    </div>
  );
}
