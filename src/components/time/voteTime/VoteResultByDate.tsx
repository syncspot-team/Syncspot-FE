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
        'w-[17.5rem]': isMobile,
      })}
    >
      {members.length === 0 && (
        <p className="mx-auto my-3 text-base text-center text-blue-dark03 text-subtitle rounded-2xl">
          투표한 사람이 없습니다
        </p>
      )}
      {members.length > 0 && isMobile && (
        <span className="flex justify-center mb-3 text-menu-selected text-blue-dark02">
          {formatStringDate(clickedDate, undefined, DATE_FORMATS.MMDD)}
          &nbsp; 투표인원
        </span>
      )}
      <div className="space-y-4">
        {members.map((memberInfo, mIndex) => {
          const { memberAvailableStartTime, memberAvailableEndTime } =
            memberInfo.dateTime;

          const startTime = formatStringTime(memberAvailableStartTime);
          const endTime = formatStringTime(memberAvailableEndTime);

          return (
            <div
              key={mIndex}
              className={mergeClassNames(
                'flex flex-row justify-around gap-4 mx-auto text-blue-normal01 ',
                { 'text-description gap-2': isMobile },
              )}
            >
              <div
                className={mergeClassNames(
                  'p-3 w-2/5 mx-auto text-center bg-white-default rounded-default',
                  { 'min-w-[6.25rem] bg-blue-light01': isMobile },
                )}
              >
                <span
                  className="block overflow-hidden whitespace-nowrap text-ellipsis"
                  title={memberInfo?.memberName}
                >
                  {memberInfo?.memberName}
                </span>
              </div>
              <div
                className={mergeClassNames(
                  'p-3 mx-auto w-3/5 text-center text-blue-dark03 whitespace-nowrap bg-white-default rounded-default ',
                  { 'w-full bg-gray-light': isMobile },
                )}
              >
                <div className="text-center">
                  {startTime} ~ {endTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
