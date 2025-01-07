import { ISignUpRequest } from '@src/types/auth/SignUpRequestType';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@src/components/common/input/Input';
import IconAntenna from '@src/assets/icons/IconAntenna.svg';
import AuthButton from '@src/components/common/button/AuthButton';
import { useSignUpMutation } from '@src/state/mutations/auth/useSignUpMutation';
import { useState } from 'react';
import { signupSchema } from '@src/utils/validatePw';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ISignUpRequest>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      pw: '',
      confirmPw: '',
      name: '',
      existAddress: false,
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLatitude: 0,
      addressLongitude: 0,
    },
  });

  const isFormValid =
    watch('email') && watch('pw') && watch('confirmPw') && watch('name');
  const [formLoading, setFormLoading] = useState(false);

  const { mutate: userSignup } = useSignUpMutation();

  const onSubmit = (data: ISignUpRequest) => {
    setFormLoading(true);
    console.log('데이터', data);
    userSignup(data);
    setFormLoading(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // 주소 검색하는 함수
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const siDo = data.sido;
        const siGunGu = data.sigungu;
        const roadNameAddress = data.roadAddress;

        // 주소와 좌표 설정
        setValue(`siDo`, siDo);
        setValue(`siGunGu`, siGunGu);
        setValue(`roadNameAddress`, roadNameAddress);
        // setValue(`addressLatitude`, addressLat);
        // setValue(`addressLongitude`, addressLong);
        setValue(`existAddress`, true);

        // const geocoder = new window.kakao.maps.services.Geocoder();
        // geocoder.addressSearch(
        //   fullAddress,
        //   function (result: any, status: any) {
        //     if (status === window.kakao.maps.services.Status.OK) {
        //       const addressLat = parseFloat(result[0].y);
        //       const addressLong = parseFloat(result[0].x);

        //       // 주소와 좌표 설정
        //       setValue(`siDo`, siDo);
        //       setValue(`siGunGu`, siGunGu);
        //       setValue(`roadNameAddress`, roadNameAddress);
        //       setValue(`addressLatitude`, addressLat);
        //       setValue(`addressLongitude`, addressLong);
        //       setValue(`existAddress`, true);
        //     }
        //   },
        // );
      },
    }).open();
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[5.625rem] text-menu text-tertiary">
      <img src={IconAntenna} alt="회원가입" />
      <h1 className="mt-5 text-title">싱크스팟 회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-row mt-5">
        <div className="mb-5">
          <p className="p-4 ">아이디 (이메일)</p>
          <Input
            type="email"
            placeholder="이메일을 입력해 주세요."
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-normal">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <p className="p-4 ">비밀번호</p>
          <Input
            type="password"
            onPaste={handlePaste}
            autoComplete="off"
            placeholder="영문 대/소문자, 숫자, 특수문자를 포함하여 주세요."
            {...register('pw')}
          />
          {errors.pw && (
            <p className="text-sm text-red-normal">{errors.pw.message}</p>
          )}
        </div>
        <div className="mb-5">
          <p className="p-4 ">비밀번호 확인</p>
          <Input
            type="password"
            onPaste={handlePaste}
            autoComplete="new-password"
            placeholder="비밀번호 확인을 위해 다시 한 번 입력해 주세요"
            maxLength={20}
            {...register('confirmPw')}
          />
          {errors.confirmPw && (
            <p className="text-sm text-red-normal">
              {errors.confirmPw.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <p className="p-4 text-menu text-blue-dark02">닉네임</p>
          <Input
            type="username"
            placeholder="닉네임은 언제든지 변경할 수 있어요!"
            maxLength={20}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-normal">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-5">
          <p className="p-4">내 주소 (선택)</p>
          <div onClick={() => openAddressSearch()}>
            <Input
              type="text"
              placeholder="내 위치를 편리하게 설정할 수 있어요!"
              maxLength={20}
              {...register('roadNameAddress')}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <AuthButton
            buttonText="회원가입"
            isLoading={formLoading}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
}
