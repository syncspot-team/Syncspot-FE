import IconEmail from '@src/assets/icons/IconEmail.svg?react';

export default function EmailButton() {
  return (
    <button className="flex items-center w-full gap-2 p-2 rounded-lg lg:p-4 hover:bg-gray-200">
      <IconEmail className="size-6" />
      <span>이메일</span>
    </button>
  );
}
