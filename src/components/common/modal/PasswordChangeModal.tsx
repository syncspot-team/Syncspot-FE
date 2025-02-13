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
  } = useForm<IPasswordFormData>({
    mode: 'onChange',
  });

  const { mutate: modifyPassword } = useModifyPasswordMutation();

  return (
    <div className="w-[17.5rem] lg:w-[25rem]">
      <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold mb-4">
        비밀번호 변경
      </h2>
      <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
        {renderPasswordField('현재 비밀번호', 'password', {
          required: '현재 비밀번호를 입력해주세요',
        })}
        {renderPasswordField('새 비밀번호', 'newPassword', {
          required: '새 비밀번호를 입력해주세요',
        })}
        {renderPasswordField('새 비밀번호 다시 입력', 'confirmPassword', {
          required: '비밀번호를 다시 입력해주세요',
          validate: (value: string) =>
            value === watch('newPassword') || '비밀번호가 일치하지 않습니다',
        })}
        {renderActionButtons()}
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
        onClose();
      },
    });
  }

  function renderPasswordField(
    label: string,
    name: keyof IPasswordFormData,
    validation: object,
  ) {
    return (
      <div>
        <label className="ml-[0.375rem] text-description font-semibold">
          {label}
        </label>
        <Input
          {...register(name, validation)}
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
        />
        {errors[name] && (
          <p className="mt-1 text-sm text-red-500">{errors[name]?.message}</p>
        )}
      </div>
    );
  }

  function renderActionButtons() {
    const buttonClasses = {
      base: 'px-4 py-1 font-semibold rounded-default text-description lg:text-content',
      submit: 'bg-primary hover:bg-secondary text-white-default',
      cancel: 'border border-primary text-primary',
    };

    return (
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="submit"
          className={`${buttonClasses.base} ${buttonClasses.submit}`}
        >
          완료
        </button>
        <button
          type="button"
          className={`${buttonClasses.base} ${buttonClasses.cancel}`}
          onClick={onClose}
        >
          취소
        </button>
      </div>
    );
  }
}
