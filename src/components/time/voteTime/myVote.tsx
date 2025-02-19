import { ITimeDatesProps, IVotes } from '@src/types/time/timeProps';
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

export default function MyVote({ dates }: ITimeDatesProps) {
  //투표여부 myVotes
  const { data: timeVotedRes } = useGetTimeVotedQuery();

  const { mutate: postVote } = usePostTimeVoteMutation();
  const { mutate: putVote } = usePutTimeVoteMutation();

  const { roomId } = useParams();

  const myVotesExistence = timeVotedRes?.data.myVotesExistence;
  const myVotes = timeVotedRes?.data.myVotes;

  //투표값 존재할 경우
  const initialVotes = myVotesExistence
    ? myVotes.map(
        ({ memberAvailableStartTime, memberAvailableEndTime }: IVotes) => ({
          memberAvailableStartTime,
          memberAvailableEndTime,
        }),
      )
    : [];

  //기본 투표정보 - 존재할경우, 없을경우[]
  const [votes, setVotes] = useState<IVotes[]>(initialVotes);

  // 체크 상태
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(dates.length).fill(false),
  );
  useEffect(() => {
    if (initialVotes.length === 0) return;

    const updatedCheckedStates = dates.map((date, index) => {
      const myVote = initialVotes[index] || {
        memberAvailableStartTime: '',
        memberAvailableEndTime: '',
      };
      const votedDate = myVote.memberAvailableStartTime.split(' ')[0];
      return formatStringDate(date) === votedDate;
    });
    setCheckedStates(updatedCheckedStates);
  }, [dates, myVotes]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  //투표하기
  const handleVote = () => {
    const voteData: ITimeVoteRequest = {
      roomId: roomId,
      dateTime: votes.map((vote) => ({
        memberAvailableStartTime: vote.memberAvailableStartTime || '',
        memberAvailableEndTime: vote.memberAvailableEndTime || '',
      })),
    };

    if (myVotesExistence) {
      putVote(voteData);
    } else {
      postVote(voteData);
    }
  };

  //select 값
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

  return (
    <div className=" h-full w-full lg:w-1/2 bg-gray-light py-5 px-4 rounded-[1.25rem]">
      <p className="text-center text-title text-blue-dark02">참석 일시 투표</p>
      {Array.isArray(dates) &&
        dates.map((date, index) => {
          const myVote = initialVotes[index] || {
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
      <Button onClick={handleVote} className="w-full px-[0.3125rem]">
        투표하기
      </Button>
    </div>
  );
}
