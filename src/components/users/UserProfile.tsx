import UserProfileImage from './UserProfileImage';
import UserProfileInfo from './UserProfileInfo';
import UserChangePassword from './UserChangePassword';

export default function UserProfile() {
  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        <h3 className="my-4 mb-4 lg:mb-8 ml-1 lg:mt-0 lg:ml-0 text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
          프로필 수정
        </h3>
        <UserProfileImage />
        <UserProfileInfo />
        <UserChangePassword />
      </div>
    </>
  );
}
