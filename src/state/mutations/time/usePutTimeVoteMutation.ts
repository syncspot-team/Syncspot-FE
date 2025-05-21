import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { putTimeVote } from '@src/apis/time/putTimeVote';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@shared/types/time/timeVoteType';
import { PATH } from '@shared/constants';
import { TIME_KEY } from '@src/state/queries/time/key';

export const usePutTimeVoteMutation = (
  options?: UseMutationOptions<ITimeVoteResponse, Error, ITimeVoteRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ dateTime }: ITimeVoteRequest) =>
      putTimeVote({ roomId, dateTime }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TIME_KEY.GET_TIME_LOOKUP(roomId!),
      });
      queryClient.invalidateQueries({
        queryKey: TIME_KEY.GET_TIME_RESULT(roomId!),
      });

      navigate(PATH.TIME_RESULT(roomId));
    },
    ...options,
  });
};
