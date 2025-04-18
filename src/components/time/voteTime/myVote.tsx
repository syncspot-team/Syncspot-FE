import { IMyVoteProps, IVotes } from '@src/types/time/timeProps';
import DatePicker from './datePicker';
import Button from '../../common/button/Button';
import {
  usePostTimeVoteMutation,
  usePutTimeVoteMutation,
} from '@src/state/mutations/time';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITimeVoteRequest } from '@src/types/time/timeVoteType';
import { DATE_FORMATS, formatStringDate } from '../utils/formatDate';
import { useGetTimeVotedQuery } from '@src/state/queries/time';
import CustomToast from '@src/components/common/toast/customToast';

export default function MyVote({ dates, bottomSheetHeight }: IMyVoteProps) {
  //투표여부 myVotes
  const { data: timeVotedRes } = useGetTimeVotedQuery();

  const { mutate: postVote } = usePostTimeVoteMutation();
  const { mutate: putVote } = usePutTimeVoteMutation();

  const { roomId } = useParams();

  const myVotesExistence = timeVotedRes?.data.myVotesExistence;
  const myVotes = timeVotedRes?.data.myVotes;

  //기본 투표정보 - 존재할경우, 없을경우[]
  const [votes, setVotes] = useState<IVotes[]>([]);

  // 체크 상태
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(dates.length).fill(false),
  );
  useEffect(() => {
    if (myVotesExistence) {
      //초기값
      const newVotes = myVotes.map(
        ({ memberAvailableStartTime, memberAvailableEndTime }: IVotes) => ({
          memberAvailableStartTime,
          memberAvailableEndTime,
        }),
      );
      setVotes(newVotes);
      // 체크 상태 업데이트
      const updatedCheckedStates = dates.map((date, index) => {
        const myVote = newVotes[index] || {
          memberAvailableStartTime: '',
          memberAvailableEndTime: '',
        };
        const votedDate = myVote.memberAvailableStartTime.split(' ')[0];
        return formatStringDate(date) === votedDate;
      });
      setCheckedStates(updatedCheckedStates);
    } else {
      // 투표 데이터가 없을 경우 초기화
      setCheckedStates(Array(dates.length).fill(false));
      setVotes([]);
    }
  }, [myVotesExistence, myVotes, dates]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  //투표하기 핸들러
  const handleVote = () => {
    const voteData: ITimeVoteRequest = {
      roomId: roomId,
      dateTime: votes.map((vote) => ({
        memberAvailableStartTime: vote.memberAvailableStartTime || '',
        memberAvailableEndTime: vote.memberAvailableEndTime || '',
      })),
    };

    // 시작 시간이 끝 시간보다 빠른 경우
    const hasInvalidTime = votes.some((vote) => {
      const startTime = new Date(vote.memberAvailableStartTime);
      const endTime = new Date(vote.memberAvailableEndTime);
      return startTime >= endTime;
    });
    if (hasInvalidTime) {
      CustomToast({
        type: 'error',
        message: '시작 시간이 종료 시간보다 늦을 수 없습니다.',
      });
      return;
    }

    if (myVotesExistence) {
      putVote(voteData);
    } else {
      postVote(voteData);
    }
  };

  //select 값 핸들러
  const handleDateChange = (
    index: number,
    date: Date,
    startHour: string,
    startMinute: string,
    endHour: string,
    endMinute: string,
  ) => {
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;

    const startTime = formatStringDate(date, start, DATE_FORMATS.TIME);
    const endTime = formatStringDate(date, end, DATE_FORMATS.TIME);

    if (checkedStates[index]) {
      const updatedVotes = [...votes];
      updatedVotes[index] = {
        memberAvailableStartTime: startTime,
        memberAvailableEndTime: endTime,
      };
      setVotes(updatedVotes);
    }
  };

  //bottomSheet 스크롤
  const getScrollAreaStyle = (bottomSheetHeight: number) => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight;

    if (bottomSheetHeight <= threshold) {
      return `max-h-[100dvh] overflow-y-auto`;
    } else {
      return 'overflow-visible';
    }
  };

  return (
    <div className="flex flex-col h-full justify-between pb-4 bg-gray-light lg:pt-12 lg:pb-6 lg:px-12 px-4 lg:rounded-[1.25rem]">
      <p className="hidden mb-4 text-center text-title text-blue-dark02 lg:block">
        참석 일시 투표
      </p>
      <div
        className={`mb-2 lg:max-h-[calc(100vh-20rem)] ${getScrollAreaStyle(bottomSheetHeight)}`}
      >
        {Array.isArray(dates) &&
          dates.map((date, index) => {
            const myVote = votes[index] || {
              memberAvailableStartTime: '',
              memberAvailableEndTime: '',
            };
            return (
              <DatePicker
                key={index}
                date={date}
                myVote={myVote}
                isChecked={checkedStates[index]}
                onCheckboxChange={() => handleCheckboxChange(index)}
                onChange={(startHour, startMinute, endHour, endMinute) =>
                  handleDateChange(
                    index,
                    date,
                    startHour,
                    startMinute,
                    endHour,
                    endMinute,
                  )
                }
              />
            );
          })}
      </div>
      <Button onClick={handleVote} className="w-full px-[0.3125rem]">
        투표하기
      </Button>
    </div>
  );
}
