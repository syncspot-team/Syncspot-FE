import { useForm } from 'react-hook-form';
import { Input } from '../common/input/Input';
import { useModifyPasswordMutation } from '@src/state/mutations/user/useModifyPasswordMutations';
import CustomToast from '../common/toast/customToast';
import Button from '../common/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';

interface IPasswordFormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPasswordFormData>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const { mutate: modifyPassword } = useModifyPasswordMutation();

  return (
    <div className="flex flex-col h-full lg:px-20">
      <h2 className="my-4 mb-4 lg:mb-8 ml-1 lg:mt-0 lg:ml-0 text-[1.25rem] lg:text-subtitle text-tertiary font-semibold">
        비밀번호 변경
      </h2>
      <form
        onSubmit={handleSubmit(handlePasswordChange)}
        className="flex flex-col gap-8 lg:max-w-[40rem]"
      >
        {renderPasswordField(
          '현재 비밀번호',
          '현재 비밀번호를 입력해주세요',
          'password',
          {
            required: '현재 비밀번호를 입력해주세요',
          },
        )}
        {renderPasswordField(
          '새 비밀번호',
          '새 비밀번호를 입력해주세요',
          'newPassword',
          {
            required: '새 비밀번호를 입력해주세요',
            validate: (value: string) =>
              value !== watch('password') || '현재 비밀번호와 동일합니다',
          },
        )}
        {renderPasswordField(
          '새 비밀번호 다시 입력',
          '새 비밀번호를 다시 입력해주세요',
          'confirmPassword',
          {
            required: '비밀번호를 다시 입력해주세요',
            validate: (value: string) =>
              value === watch('newPassword') || '비밀번호가 일치하지 않습니다',
          },
        )}

        <Button type="submit" className="w-full px-[0.3125rem]">
          완료
        </Button>
      </form>
    </div>
  );

  function handlePasswordChange(data: IPasswordFormData) {
    const modifyPasswordPayload = {
      password: data.password,
      newPassword: data.newPassword,
    };
    modifyPassword(modifyPasswordPayload, {
      onSuccess: () => {
        CustomToast({
          type: 'success',
          message: '비밀번호가 변경되었습니다.',
        });
        navigate(`${PATH.USERS}/${PATH.USERS_PROFILE}`);
      },
    });
  }

  function renderPasswordField(
    label: string,
    placeholder: string,
    name: keyof IPasswordFormData,
    validation: object,
  ) {
    return (
      <div className="flex flex-col w-full">
        <label className="ml-[0.375rem] text-description lg:text-content font-semibold">
          {label}
        </label>
        <Input
          {...register(name, validation)}
          type="password"
          placeholder={placeholder}
          className="mt-1 bg-white-default ring-1 ring-gray-normal py-[0.875rem] pl-[0.625rem]"
          onCopy={(e: React.ClipboardEvent) => {
            e.preventDefault();
            return false;
          }}
          onPaste={(e: React.ClipboardEvent) => {
            e.preventDefault();
            return false;
          }}
        />
        {errors[name] && (
          <p className="mt-1 text-description text-error-normal">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }
}
