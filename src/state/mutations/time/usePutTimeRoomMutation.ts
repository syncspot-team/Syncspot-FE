import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';
import { putTimeRoom } from '@src/apis/time/putTimeRoom';
import { TIME_KEY } from '@src/state/queries/time/key';
import { PATH } from '@src/constants/path';

export const usePutTimeRoomMutation = (
  options?: UseMutationOptions<ITimeRoomResponse, Error, ITimeRoomRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ dates }: ITimeRoomRequest) => putTimeRoom({ roomId, dates }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TIME_KEY.GET_TIME_DATES(roomId!)],
      });
      navigate(PATH.TIME_VOTE(roomId));
    },
    ...options,
  });
};
