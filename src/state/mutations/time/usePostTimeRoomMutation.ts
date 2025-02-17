import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { postTimeRoom } from '@src/apis/time/postTimeRoom';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';
import { TIME_KEY } from '@src/state/queries/time/key';
import { PATH } from '@src/constants/path';

export const usePostTimeRoomMutation = (
  options?: UseMutationOptions<ITimeRoomResponse, Error, ITimeRoomRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ dates }: ITimeRoomRequest) =>
      postTimeRoom({ roomId, dates }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TIME_KEY.GET_TIME_DATES(roomId!)],
      });
      navigate(PATH.TIME_VOTE(roomId));
    },
    ...options,
  });
};
