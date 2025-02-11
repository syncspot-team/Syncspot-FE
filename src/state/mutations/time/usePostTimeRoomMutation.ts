import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postTimeRoom } from '@src/apis/time/postTimeRoom';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';

export const usePostTimeRoomMutation = (
  options?: UseMutationOptions<ITimeRoomResponse, Error, ITimeRoomRequest>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: ({ dates }: ITimeRoomRequest) =>
      postTimeRoom({ roomId, dates }),
    ...options,
  });
};
