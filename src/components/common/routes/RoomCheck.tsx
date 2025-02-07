import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJoinedRoomCheckQuery } from '@src/state/queries/common/useGetJoinedRoomCheckQuery';
import { useSaveUserToRoomMutation } from '@src/state/mutations/onboarding/useSaveUserToRoomMutation';
import { useQueryClient } from '@tanstack/react-query';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { Loading } from '@src/components/loading/Loading';

interface RoomCheckProps {
  children: React.ReactNode;
}

const RoomCheck = ({ children }: RoomCheckProps) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: joinedRoomCheck,
    isLoading: isCheckLoading,
    refetch,
  } = useGetJoinedRoomCheckQuery(roomId!);

  const { mutate: saveUserToRoom, isPending: isSaving } =
    useSaveUserToRoomMutation({
      onSuccess: async () => {
        // 방 체크 쿼리와 방 목록 쿼리를 모두 갱신
        await Promise.all([
          refetch(),
          queryClient.refetchQueries({
            queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
          }),
        ]);
      },
    });

  // useEffect를 사용하여 사이드 이펙트 처리
  useEffect(() => {
    if (joinedRoomCheck && !joinedRoomCheck.data.exists) {
      saveUserToRoom({ roomId });
    }
  }, [joinedRoomCheck, roomId, saveUserToRoom]);

  // 로딩 상태 통합 처리
  if (isCheckLoading || isSaving) {
    return <Loading />;
  }

  // 방 멤버 확인이 완료되고, 멤버인 경우에만 children 렌더링
  return joinedRoomCheck?.data.exists ? <>{children}</> : <Loading />;
};

export default RoomCheck;
