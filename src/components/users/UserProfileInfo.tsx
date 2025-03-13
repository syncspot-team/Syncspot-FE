import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';
import { usePatchUserAddressMutation } from '@src/state/mutations/user/usePatchUserAddressMutation';
import { usePatchUserNickNameMutation } from '@src/state/mutations/user/usePatchUserNickNameMutation';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '../common/kakao/types';
import { IModifyUserAddressRequest } from '@src/types/users/modifyUserAddressRequestType';

interface IProfileFormData {
  nickname: string;
  email: string;
  address: IModifyUserAddressRequest;
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
  const [initialAddress, setInitialAddress] = useState<string | null>(null);

  const { data: userInfo } = useGetUserInfoQuery();

  const { mutate: patchUserNickName } = usePatchUserNickNameMutation();
  const { mutate: patchUserAddress } = usePatchUserAddressMutation();

  const {
    register,
    handleSubmit: handleSubmitProfile,
    reset,
    setValue,
    watch,
  } = useForm<IProfileFormData>();

  const currentAddress = watch('address')?.roadNameAddress || '';

  useEffect(() => {
    if (userInfo?.data) {
      setInitialNickname(userInfo.data.name);
      setInitialAddress(userInfo.data.roadNameAddress);
      reset({
        nickname: userInfo.data.name,
        email: userInfo.data.email,
        address: {
          siDo: userInfo.data.siDo,
          siGunGu: userInfo.data.siGunGu,
          roadNameAddress: userInfo.data.roadNameAddress,
          addressLatitude: parseFloat(userInfo.data.addressLatitude),
          addressLongitude: parseFloat(userInfo.data.addressLongitude),
        },
      });
    }
  }, [userInfo]);

  const handleProfileSave = (data: IProfileFormData) => {
    if (data.nickname !== initialNickname) {
      patchUserNickName({
        name: data.nickname,
      });
    }

    if (data.address.roadNameAddress !== initialAddress) {
      patchUserAddress({
        siDo: data.address.siDo,
        siGunGu: data.address.siGunGu,
        roadNameAddress: data.address.roadNameAddress,
        addressLatitude: data.address.addressLatitude,
        addressLongitude: data.address.addressLongitude,
      });
    }

    setIsEditing(false);
  };

  const handleLocationSelect = (location: ISelectedLocation) => {
    setValue('address', {
      siDo: location.address?.address.region_1depth_name || '',
      siGunGu: location.address?.address.region_2depth_name || '',
      roadNameAddress: location.place.place_name,
      addressLatitude: parseFloat(location.place.y),
      addressLongitude: parseFloat(location.place.x),
    });
    return true;
  };

  return (
    <form onSubmit={handleSubmitProfile(handleProfileSave)}>
      <div className="flex items-center justify-between mt-4 mb-5 lg:mb-7">
        <h2 className="font-semibold text-content lg:text-subtitle text-tertiary">
          개인정보
        </h2>
        <div className="flex items-center gap-2">
          {renderProfileInfoEditButtons()}
        </div>
      </div>
      <label className="ml-[0.375rem] text-blue-dark03  text-description lg:text-content">
        닉네임
      </label>
      <Input
        {...register('nickname')}
        disabled={!isEditing}
        className={`w-full text-blue-dark03  my-4 ${isEditing ? 'bg-white-default ring-1 ring-primary' : 'bg-gray-light cursor-not-allowed'}`}
      />
      <label className="ml-[0.375rem] text-blue-dark03  text-description lg:text-content">
        아이디(이메일)
      </label>
      <Input
        {...register('email')}
        type="email"
        disabled={true}
        className={`w-full  text-blue-dark03  my-4 bg-gray-light cursor-not-allowed`}
      />
      <label className="ml-[0.375rem] text-blue-dark03  text-description lg:text-content">
        주소
      </label>
      {isEditing ? (
        <KakaoLocationPicker
          defaultAddress={currentAddress}
          onSelect={handleLocationSelect}
          InputClassName={`my-4  ${isEditing ? 'bg-white-default ring-1 ring-primary' : 'bg-gray-light cursor-not-allowed'}`}
        />
      ) : (
        <Input
          value={currentAddress || '선택된 주소가 없습니다'}
          disabled
          className="w-full my-4 cursor-not-allowed text-blue-dark03 bg-gray-light"
        />
      )}
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
            reset({
              nickname: initialNickname || '',
              email: userInfo?.data.email || '',
              address: {
                siDo: userInfo?.data.siDo || '',
                siGunGu: userInfo?.data.siGunGu || '',
                roadNameAddress: initialAddress || '',
                addressLatitude: parseFloat(
                  userInfo?.data.addressLatitude || '0',
                ),
                addressLongitude: parseFloat(
                  userInfo?.data.addressLongitude || '0',
                ),
              },
            });
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
