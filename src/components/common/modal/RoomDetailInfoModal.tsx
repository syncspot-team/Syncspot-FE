import { useState, useEffect } from 'react';
import Button from '@src/components/common/button/Button';
import { IRoom } from '@src/types/header/joinRoomResponseType';
import { useGetRoomDetailInfoQuery } from '@src/state/queries/onboarding/useGetRoomDetailInfoQuery';
import { usePatchRoomNameMutation } from '@src/state/mutations/onboarding/usePatchRoomNameMutation';
import { usePatchRoomMemoMutation } from '@src/state/mutations/onboarding/usePatchRoomMemoMutation';
import EditableField from '@src/components/onboarding/modal/EditableField';
import { useDeleteUserFromRoomMutation } from '@src/state/mutations/onboarding/useDeleteUserFromRoomMutation';
import CustomToast from '../toast/customToast';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';

interface IRoomDetailInfoModalProps {
  room: IRoom;
  onClose: () => void;
}

interface IRoomDetailInfo {
  data: {
    name: string;
    memo: string;
    memberCount: number;
    emails: string[];
  };
}

export const EDIT_TYPE = {
  NAME: 'name',
  MEMO: 'memo',
} as const;

type EditType = (typeof EDIT_TYPE)[keyof typeof EDIT_TYPE];

export default function RoomDetailInfoModal({
  room,
  onClose,
}: IRoomDetailInfoModalProps) {
  const navigate = useNavigate();
  const { data: roomDetailInfoData } = useGetRoomDetailInfoQuery(room.roomId);
  const [roomDetailInfo, setRoomDetailInfo] = useState<IRoomDetailInfo | null>(
    null,
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [memo, setMemo] = useState('');

  const { mutate: patchRoomName } = usePatchRoomNameMutation();
  const { mutate: patchRoomMemo } = usePatchRoomMemoMutation();
  const { mutate: deleteUserFromRoom } = useDeleteUserFromRoomMutation();

  useEffect(() => {
    if (roomDetailInfoData) {
      setRoomDetailInfo(roomDetailInfoData);
      setRoomName(roomDetailInfoData.data.name);
      setMemo(roomDetailInfoData.data.memo);
    }
  }, [roomDetailInfoData]);

  const handleEdit = (type: EditType, value: string) => {
    const isEditing = type === EDIT_TYPE.NAME ? isEditingName : isEditingMemo;
    const setIsEditing =
      type === EDIT_TYPE.NAME ? setIsEditingName : setIsEditingMemo;

    if (isEditing) {
      if (type === EDIT_TYPE.NAME) {
        patchRoomName({ roomId: room.roomId, name: value });
      } else {
        patchRoomMemo({ roomId: room.roomId, memo: value });
      }
      setRoomDetailInfo((prev) => ({
        ...prev!,
        data: { ...prev!.data, [type]: value },
      }));
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteUserFromRoom = () => {
    deleteUserFromRoom(
      {},
      {
        onSuccess: () => {
          CustomToast({
            type: 'success',
            message: '해당 모임에서 나갔습니다.',
          });
          onClose();
          navigate(PATH.ONBOARDING);
        },
      },
    );
  };

  return (
    <div className="w-[17.5rem] lg:w-[25rem] flex flex-col items-center">
      <h1 className="mb-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 정보
      </h1>
      <div className="flex flex-col w-full mb-3">
        <h3 className="text-content lg:text-menu text-blue-dark03">이름</h3>
        <EditableField
          isEditing={isEditingName}
          value={roomName}
          displayValue={roomDetailInfo?.data.name || ''}
          onChange={(e) => setRoomName(e.target.value)}
          onEditToggle={() => handleEdit(EDIT_TYPE.NAME, roomName)}
        />
      </div>

      <div className="flex flex-col w-full mb-3">
        <h3 className="text-content lg:text-menu text-blue-dark03">메모</h3>
        <EditableField
          isEditing={isEditingMemo}
          value={memo}
          displayValue={roomDetailInfo?.data.memo || ''}
          onChange={(e) => setMemo(e.target.value)}
          onEditToggle={() => handleEdit(EDIT_TYPE.MEMO, memo)}
        />
      </div>

      <h1 className="my-6 text-center text-subtitle lg:text-title text-tertiary">
        모임 참여 인원
      </h1>
      <ul className="max-h-[10rem] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
        {roomDetailInfo?.data.emails?.map((email: string) => (
          <li key={email} className="p-2 text-description text-blue-dark03">
            {email}
          </li>
        ))}
      </ul>

      <Button
        onClick={handleDeleteUserFromRoom}
        className="w-full mt-4 px-[0.3125rem]"
      >
        모임 나가기
      </Button>
      <Button
        buttonType="secondary"
        onClick={onClose}
        className="w-full mt-4 px-[0.3125rem]"
      >
        닫기
      </Button>
    </div>
  );
}
