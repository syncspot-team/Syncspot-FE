import { Input } from '@src/components/common/input/Input';
import IconEditPen from '@src/assets/icons/IconEditPen.svg?react';

interface IEditableFieldProps {
  isEditing: boolean;
  value: string;
  displayValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditToggle: () => void;
}

export default function EditableField({
  isEditing,
  value,
  displayValue,
  onChange,
  onEditToggle,
}: IEditableFieldProps) {
  return (
    <div className="relative flex items-center justify-between gap-2">
      {isEditing ? (
        <Input
          value={value}
          onChange={onChange}
          className="flex-1 py-3 pl-2 rounded-lg bg-white-default ring-1 ring-gray-normal text-description lg:text-content"
        />
      ) : (
        <p className="flex-1 p-3 pl-4 truncate rounded-lg text-description lg:text-content bg-gray-light text-blue-dark03">
          {displayValue}
        </p>
      )}
      {isEditing ? (
        <span
          onClick={onEditToggle}
          className="cursor-pointer p-2 text-description bg-blue-light01 text-blue-dark03 hover:bg-blue-light02 rounded-[0.5rem]"
        >
          완료
        </span>
      ) : (
        <IconEditPen
          className="cursor-pointer p-1 rounded-[0.5rem] absolute right-2 hover:bg-white-default text-blue-dark03"
          onClick={onEditToggle}
        />
      )}
    </div>
  );
}
