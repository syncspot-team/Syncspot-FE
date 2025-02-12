import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/types/time/timeVoteType';
import { postTimeVote } from '@src/apis/time/postTimeVote';

export const usePostTimeVoteMutation = (
  options?: UseMutationOptions<ITimeVoteResponse, Error, ITimeVoteRequest>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: ({ dateTime }: ITimeVoteRequest) =>
      postTimeVote({ roomId, dateTime }),
    ...options,
  });
};
