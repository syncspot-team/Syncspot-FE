import { ISignUpFormValues } from '@src/types/auth/SignUpRequestType';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@src/components/common/input/Input';
import Button from '@src/components/common/button/Button';
import { useSignUpMutation } from '@src/state/mutations/auth/useSignUpMutation';
import KakaoLocationPicker from '@src/components/common/kakao/KakaoLocationPicker';
import { ISelectedLocation } from '@src/components/common/kakao/types';
import { signupSchema } from '@src/types/auth/SignUpSchema';

const signUpDefaultValues: ISignUpFormValues = {
  name: '',
  email: '',
  pw: '',
  confirmPw: '',
  existAddress: false,
  siDo: '',
  siGunGu: '',
  roadNameAddress: '',
  addressLatitude: 0,
  addressLongitude: 0,
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ISignUpFormValues>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
    defaultValues: signUpDefaultValues,
  });
  const { mutate: userSignup, isPending } = useSignUpMutation();
  const isFormValid =
    watch('email') && watch('pw') && watch('confirmPw') && watch('name');

  const onSubmit = (data: ISignUpFormValues) => {
    const { confirmPw, ...signUpPayload } = data;
    userSignup(signUpPayload);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleLocationSelect = (location: ISelectedLocation) => {
    const { place, address } = location;

    setValue('siDo', address?.address.region_1depth_name || '');
    setValue('siGunGu', address?.address.region_2depth_name || '');
    setValue('roadNameAddress', place?.place_name || '');
    setValue('addressLatitude', address?.y ? parseFloat(address.y) : 0);
    setValue('addressLongitude', address?.x ? parseFloat(address.x) : 0);
    setValue('existAddress', true);

    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[3.4375rem]">
      <h1 className="mb-[1.875rem] text-title text-tertiary">
        싱크스팟 회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <span className="ml-2 mb-[0.125rem] text-menu text-tertiary">
          아이디 (이메일)
        </span>
        <Input
          type="email"
          placeholder="이메일을 입력해 주세요"
          {...register('email')}
        />
        {errors.email && (
          <p className="ml-2 text-sm text-error-normal">
            {errors.email.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary">
          비밀번호
        </span>
        <Input
          type="password"
          onPaste={handlePaste}
          autoComplete="off"
          placeholder="영문 대/소문자, 숫자, 특수문자를 포함하여 주세요"
          {...register('pw')}
        />
        {errors.pw && (
          <p className="ml-2 text-sm text-error-normal">{errors.pw.message}</p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary">
          비밀번호 확인
        </span>
        <Input
          type="password"
          onPaste={handlePaste}
          autoComplete="new-password"
          placeholder="비밀번호 확인을 위해 다시 한 번 입력해 주세요"
          maxLength={20}
          {...register('confirmPw')}
        />
        {errors.confirmPw && (
          <p className="ml-2 text-sm text-error-normal">
            {errors.confirmPw.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary">
          닉네임
        </span>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
          maxLength={20}
          {...register('name')}
        />
        {errors.name && (
          <p className="ml-2 text-sm text-error-normal">
            {errors.name.message}
          </p>
        )}
        <span className="ml-2 mt-[1rem] mb-[0.125rem] text-menu text-tertiary">
          내 주소 (선택)
        </span>
        <KakaoLocationPicker
          className="text-left ring-1 ring-gray-normal bg-white-default rounded-default"
          onSelect={handleLocationSelect}
        />
        <Button
          buttonType="primary"
          isLoading={isPending}
          disabled={!isFormValid}
          className="mt-[1.75rem]"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
