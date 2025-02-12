import { ITimeVotedMyProps } from '@src/types/time/timeProps';
import DatePicker from './datePicker';
import Button from '../common/button/Button';
import {
  usePostTimeVoteMutation,
  usePutTimeVoteMutation,
} from '@src/state/mutations/time';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITimeVoteRequest } from '@src/types/time/timeVoteType';

export default function MyVote({
  dates,
  myVotesExistence,
  myVotes,
}: ITimeVotedMyProps) {
  const postVote = usePostTimeVoteMutation();
  const putVote = usePutTimeVoteMutation();
  const { roomId } = useParams();

  const [votes, setVotes] = useState<{ start: string; end: string }[]>([]);

  const formattedVotes = myVotesExistence
    ? myVotes.map(({ memberAvailableStartTime, memberAvailableEndTime }) => ({
        memberAvailableStartTime,
        memberAvailableEndTime,
      }))
    : [];

  const handleVote = () => {
    const voteData: ITimeVoteRequest = {
      roomId: roomId,
      dateTime: votes.map((vote) => ({
        memberAvailableStartTime: vote.start || '',
        memberAvailableEndTime: vote.end || '',
      })),
    };

    if (myVotesExistence) {
      // PUT 요청
      putVote.mutate(voteData);
    } else {
      // POST 요청
      postVote.mutate(voteData);
    }
  };

  const handleDateChange = (index: number, start: string, end: string) => {
    const updatedVotes = [...votes];
    updatedVotes[index] = { start, end };
    setVotes(updatedVotes);
  };

  return (
    <div className="relative h-full">
      <p className="mt-1 mb-6">참석 일시 투표</p>
      {Array.isArray(dates) &&
        dates.map((date, index) => {
          const myVote = formattedVotes[index] || {
            memberAvailableStartTime: '',
            memberAvailableEndTime: '',
          };
          return (
            <DatePicker
              key={index}
              date={date}
              myVote={myVote}
              onChange={(start, end) => handleDateChange(index, start, end)}
            />
          );
        })}
      <div className="h-14"></div>
      <div className="absolute bottom-2 w-[95%] mx-auto">
        <Button onClick={handleVote}>투표하기</Button>
      </div>
    </div>
  );
}
