import { IVoteResultByDate } from '@src/types/time/timeProps';
import { formatStringDate } from '../utils/formatDate';
import { formatStringTime } from '../utils/formatTime';

export default function VoteResultByDate({
  clickedDate,
  result,
}: IVoteResultByDate) {
  const formatted = formatStringDate(clickedDate, 'yyyy-mm-dd');
  const members = result[formatted] || [];
  return (
    <div className="p-4  bg-gray-light rounded-[1.25rem] text-menu">
      {members.length === 0 && (
        <p className="mx-auto my-3 text-base text-center text-blue-dark03 text-subtitle rounded-2xl">
          투표한 사람이 없습니다
        </p>
      )}
      {members.map((memberInfo, mIndex) => (
        <div
          key={mIndex}
          className="flex flex-row justify-around gap-4 mx-auto text-blue-normal01 "
        >
          <div className="w-1/3 text-center bg-white-default rounded-[.875rem] p-3 mx-auto">
            {memberInfo?.memberName}
          </div>
          <div className="w-2/3 text-center  bg-white-default rounded-[.875rem] p-3 mx-auto ">
            {memberInfo?.dateTime?.map((time, tIndex) => {
              const startTime = formatStringTime(time.memberAvailableStartTime);
              const endTime = formatStringTime(time.memberAvailableEndTime);

              return (
                <div key={tIndex} className="text-center">
                  {startTime} ~ {endTime}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
