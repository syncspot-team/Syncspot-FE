import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/types/time/timeVoteType';
import { postTimeVote } from '@src/apis/time/postTimeVote';
import { TIME_KEY } from '@src/state/queries/time/key';
import { PATH } from '@src/constants/path';

export const usePostTimeVoteMutation = (
  options?: UseMutationOptions<ITimeVoteResponse, Error, ITimeVoteRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ dateTime }: ITimeVoteRequest) =>
      postTimeVote({ roomId, dateTime }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TIME_KEY.GET_TIME_VOTED(roomId!),
      });
      navigate(PATH.TIME_RESULT(roomId));
    },
    ...options,
  });
};
