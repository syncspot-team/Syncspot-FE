import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TIME_KEY } from './key';
import { ITimeResultResponseType } from '@src/types/time/timeResultType';
import { getTimeResult } from '@src/apis/time/getTimeResult';

export const useGetTimeResultQuery = (
  options?: UseQueryOptions<
    ITimeResultResponseType,
    Error,
    ITimeResultResponseType
  >,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: TIME_KEY.GET_TIME_RESULT(roomId!),
  });

  return useQuery({
    queryKey: TIME_KEY.GET_TIME_RESULT(roomId!),
    queryFn: () => getTimeResult(roomId!),
    ...options,
  });
};
