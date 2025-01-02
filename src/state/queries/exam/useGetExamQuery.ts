import { getExam, IExam } from '@src/apis/exam/exam';
import { EXAM_QUERY_KEY } from './key';
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export const useGetExamQuery = (options?: UseSuspenseQueryOptions<IExam>) => {
  return useSuspenseQuery({
    queryKey: EXAM_QUERY_KEY.GET_EXAM(),
    queryFn: getExam,
    ...options,
  });
};
