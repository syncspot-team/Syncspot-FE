import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';
import { useModifyPasswordMutation } from '@src/state/mutations/user/useModifyPasswordMutations';
import CustomToast from '@src/components/common/toast/customToast';

interface IPasswordFormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface IPasswordChangeModalProps {
  onClose: () => void;
}

export default function PasswordChangeModal({
  onClose,
}: IPasswordChangeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPasswordFormData>();

  const newPassword = watch('newPassword');

  const { mutate: modifyPassword } = useModifyPasswordMutation();

  return (
    <div className="w-[17.5rem] lg:w-[25rem]">
      <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold mb-4">
        비밀번호 변경
      </h2>
      <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            현재 비밀번호
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal py-[0.875rem] pl-[0.625rem]"
            onCopy={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            {...register('password', {
              required: '현재 비밀번호를 입력해주세요',
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            새 비밀번호
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal py-[0.875rem] pl-[0.625rem]"
            onCopy={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            {...register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
            })}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            새 비밀번호 다시 입력
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal py-[0.875rem] pl-[0.625rem]"
            onCopy={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e: React.ClipboardEvent) => {
              e.preventDefault();
              return false;
            }}
            {...register('confirmPassword', {
              required: '비밀번호를 다시 입력해주세요',
              validate: (value) =>
                value === newPassword || '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="submit"
            className="px-4 py-1 font-semibold rounded-default text-white-default bg-primary hover:bg-secondary text-description lg:text-content"
          >
            완료
          </button>
          <button
            type="button"
            className="px-4 py-1 font-semibold border rounded-default text-primary border-primary text-description lg:text-content"
            onClick={onClose}
          >
            취소
          </button>
        </div>
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
      },
    });
    onClose();
  }
}
