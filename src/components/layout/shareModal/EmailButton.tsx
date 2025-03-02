import IconEmail from '@src/assets/icons/IconEmail.svg?react';

export default function EmailButton() {
  return (
    <button className="flex items-center w-full gap-2 p-3 rounded-lg hover:bg-gray-light">
      <IconEmail className="size-6" />
      <span>이메일</span>
    </button>
  );
}
