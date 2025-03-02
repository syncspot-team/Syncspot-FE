import { IVoteResultByDate } from '@src/types/time/timeProps';
import { DATE_FORMATS, formatStringDate } from '../utils/formatDate';
import { formatStringTime } from '../utils/formatTime';
import { mergeClassNames } from '@src/utils/mergeClassNames';

export default function VoteResultByDate({
  clickedDate,
  result,
  isMobile,
}: IVoteResultByDate) {
  const formatted = formatStringDate(clickedDate);
  const members = result[formatted] || [];

  return (
    <div
      className={mergeClassNames({
        'p-4 bg-gray-light rounded-[1.25rem] text-menu': !isMobile,
      })}
    >
      {members.length === 0 && (
        <p className="mx-auto my-3 text-base text-center text-blue-dark03 text-subtitle rounded-2xl">
          투표한 사람이 없습니다
        </p>
      )}
      {members.length > 0 && isMobile && (
        <span className="flex justify-center mb-4 text-menu-selected text-blue-dark02">
          {formatStringDate(clickedDate, undefined, DATE_FORMATS.MMDD)}
          투표인원
        </span>
      )}
      {members.map((memberInfo, mIndex) => (
        <div
          key={mIndex}
          className={mergeClassNames(
            'flex flex-row justify-around gap-4 mx-auto text-blue-normal01 ',
            { 'text-description gap-2': isMobile },
          )}
        >
          <div className="w-1/3 p-3 mx-auto text-center bg-white-default rounded-default">
            {memberInfo?.memberName}
          </div>
          <div
            className={mergeClassNames(
              'w-2/3 p-3 mx-auto text-center whitespace-nowrap bg-white-default rounded-default ',
              { 'text-blue-dark03 w-full': isMobile },
            )}
          >
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
