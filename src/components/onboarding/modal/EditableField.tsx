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
    <div className="flex items-center justify-between gap-2">
      {isEditing ? (
        <Input
          value={value}
          onChange={onChange}
          className="flex-1 py-1 pl-2 rounded-lg bg-white-default ring-1 ring-gray-normal text-description lg:text-content"
        />
      ) : (
        <p className="flex-1 truncate text-description lg:text-content">
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
          className="cursor-pointer p-1 rounded-[0.5rem] hover:bg-gray-light"
          onClick={onEditToggle}
        />
      )}
    </div>
  );
}
