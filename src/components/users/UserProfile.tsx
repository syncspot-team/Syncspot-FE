import UserProfileImage from './UserProfileImage';
import UserProfileInfo from './UserProfileInfo';

export default function UserProfile() {
  return (
    <>
      <div className="flex flex-col h-full lg:px-20">
        <h3 className="my-4 mb-4 ml-1 font-semibold lg:mb-8 lg:mt-0 lg:ml-0 text-content lg:text-subtitle text-tertiary">
          프로필 수정
        </h3>
        <div className="flex flex-col flex-1 pb-6">
          <UserProfileImage />
          <UserProfileInfo />
        </div>
      </div>
    </>
  );
}
