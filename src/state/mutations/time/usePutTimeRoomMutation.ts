import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';
import { putTimeRoom } from '@src/apis/time/putTimeRoom';

export const usePutTimeRoomMutation = (
  options?: UseMutationOptions<ITimeRoomResponse, Error, ITimeRoomRequest>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: ({ dates }: ITimeRoomRequest) => putTimeRoom({ roomId, dates }),
    ...options,
  });
};
