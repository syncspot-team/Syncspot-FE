import { useForm } from 'react-hook-form';
import { Input } from '@src/components/common/input/Input';

interface IPasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IPasswordChangeModalProps {
  onClose: () => void;
}

export default function PasswordChangeModal({
  onClose,
}: IPasswordChangeModalProps) {
  const { register, handleSubmit } = useForm<IPasswordFormData>();

  const onSubmit = async (data: IPasswordFormData) => {
    // API 호출하여 서버에 비밀번호 변경사항 저장
    console.log('변경된 비밀번호:', data);
    onClose();
  };

  return (
    <div className="w-[17.5rem] lg:w-[25rem]">
      <h2 className="text-[1.25rem] lg:text-subtitle text-tertiary font-semibold mb-4">
        비밀번호 변경
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            현재 비밀번호
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal"
            {...register('currentPassword')}
          />
        </div>
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            새 비밀번호
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal"
            {...register('newPassword')}
          />
        </div>
        <div>
          <label className="ml-[0.375rem] text-description font-semibold">
            새 비밀번호 다시 입력
          </label>
          <Input
            type="password"
            className="w-full mt-1 bg-white-default ring-1 ring-gray-normal"
            {...register('confirmPassword')}
          />
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
            className="px-4 py-1 font-semibold border rounded-default text-primary border-primary hover:bg-gray-100 text-description lg:text-content"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
