import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { putTimeVote } from '@src/apis/time/putTimeVote';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/types/time/timeVoteType';

export const usePutTimeVoteMutation = (
  options?: UseMutationOptions<ITimeVoteResponse, Error, ITimeVoteRequest>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: ({ dateTime }: ITimeVoteRequest) =>
      putTimeVote({ roomId, dateTime }),
    ...options,
  });
};
