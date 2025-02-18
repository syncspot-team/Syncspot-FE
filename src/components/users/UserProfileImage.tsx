import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useGetUserProfileImageQuery } from '@src/state/queries/users/useGetUserProfileImageQuery';
import { getUserPresignedUrl } from '@src/apis/users/getUserPresignedUrl';
import axios from 'axios';
import CustomToast from '@src/components/common/toast/customToast';

export default function UserProfileImage() {
  const [profileImage, setProfileImage] = useState('/favicon.svg');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profileImageData, refetch: refetchProfileImage } =
    useGetUserProfileImageQuery();

  useEffect(() => {
    if (profileImageData?.data.isExist) {
      setProfileImage(profileImageData.data.url);
    }
  }, [profileImageData]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const encodedFileName = encodeURIComponent(file.name);
      const presignedUrlData = await getUserPresignedUrl(encodedFileName);

      if (!presignedUrlData) return;

      const { preSignedUrl } = presignedUrlData.data;

      await axios.put(preSignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      await refetchProfileImage();
    } catch (error) {
      CustomToast({
        type: 'error',
        message: '이미지 업로드에 실패했습니다.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-10 mb-8">
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
        disabled={isUploading}
      >
        {isUploading ? '업로드 중...' : '변경'}
      </button>
    </div>
  );
}
