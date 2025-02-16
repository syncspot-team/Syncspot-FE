import Arrow from '@src/assets/icons/IconTriangle.svg?react';
import { useGetTimeResultQuery } from '@src/state/queries/time';
import { items } from '@src/types/time/GridColor';
import { IMemberAvailability } from '@src/types/time/timeResultType';
import {
  format12Hour,
  format24Hour,
  getTimeIndex,
} from '@src/components/time/utils/formatTime';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useEffect, useState } from 'react';
import GridTime from './gridTime';

export default function VoteResultGrid() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [morGridColors, setMorGridColors] = useState(
    Array(72).fill(items[0].color),
  ); // 초기 색상 설정
  const [afterGridColors, setAfterGridColors] = useState(
    Array(72).fill(items[0].color),
  ); // 초기 색상 설정

  const hoursTo12 = format12Hour();
  const hoursTo24 = format24Hour();

  const { data } = useGetTimeResultQuery();

  //표시되는 날짜 리스트
  const dateKeys = Object.keys(data?.result || {});
  const formattedDates = dateKeys.map((date) => {
    // const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    return `${month}월 ${day}일`;
  });

  //날짜 화살표
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < formattedDates.length - 1) {
        return prevIndex + 1; // 다음으로 이동
      }
      return prevIndex; // 마지막 인덱스에서 더 이상 이동하지 않음
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1; // 이전으로 이동
      }
      return prevIndex; // 첫 번째 인덱스에서 더 이상 이동하지 않음
    });
  };

  useEffect(() => {
    logNowDateData();
  }, [data?.result, currentIndex]);

  // 막대그래프 색상 적용
  const fillGridColors = (nowDateData: IMemberAvailability[]) => {
    const morGridColors = Array(72).fill(items[0].color);
    const afterGridColors = Array(72).fill(items[0].color);
    // 시간대별로 이름 수를 세기 위한 배열
    const morCount = Array(72).fill(0);
    const afterCount = Array(72).fill(0);

    nowDateData.forEach((item) => {
      // dateTime이 존재하는 경우에만 처리
      if (item.dateTime.length > 0) {
        item.dateTime.forEach((dateTimeItem) => {
          // 각 dateTime 항목을 순회
          const startTime = dateTimeItem.memberAvailableStartTime;
          const endTime = dateTimeItem.memberAvailableEndTime;
          const startIndex = getTimeIndex(startTime);
          const endIndex = getTimeIndex(endTime);

          // 0~12시 범위
          if (startIndex >= 0 && startIndex <= 72) {
            for (let i = startIndex; i < Math.min(endIndex, 72); i++) {
              morCount[i]++;
            }
          }
          // 12~24시 범위
          if (endIndex > 72) {
            for (
              let i = Math.max(startIndex - 72, 0);
              i < Math.min(endIndex - 72, 72);
              i++
            ) {
              afterCount[i]++;
            }
          }
        });
      }
    });

    // 색상 적용
    morCount.forEach((count, index) => {
      if (count > 0) {
        morGridColors[index] = items[Math.min(count, items.length - 1)].color;
      }
    });
    afterCount.forEach((count, index) => {
      if (count > 0) {
        afterGridColors[index] = items[Math.min(count, items.length - 1)].color;
      }
    });

    return { morGridColors, afterGridColors };
  };

  const logNowDateData = () => {
    const nowDateKey = dateKeys[currentIndex];
    const nowDateData: IMemberAvailability[] = data?.result[nowDateKey] || [];
    const { morGridColors, afterGridColors } = fillGridColors(nowDateData);
    setMorGridColors(morGridColors);
    setAfterGridColors(afterGridColors);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center w-[25%] mx-auto mb-3 justify-evenly mt-4">
        <button
          onClick={handlePrev}
          className={mergeClassNames(
            currentIndex === 0 ? 'text-gray-light' : 'text-blue-light02',
          )}
          disabled={currentIndex === 0}
        >
          <Arrow className="text-title " />
        </button>
        <p className="font-bold text-center text-title text-blue-dark03">
          {formattedDates[currentIndex]}
        </p>
        <button
          onClick={handleNext}
          className={mergeClassNames(
            currentIndex === formattedDates.length - 1
              ? 'text-gray-light'
              : 'text-blue-light02',
          )}
          disabled={currentIndex === formattedDates.length - 1}
        >
          <Arrow className="rotate-180 text-title" />
        </button>
      </div>

      {/* 인원 */}
      <div className="flex flex-row items-center justify-center w-full gap-3 mx-auto my-2">
        <span>0/0 가능</span>
        <div
          className="grid h-10 overflow-hidden border-2 border-blue-normal01 rounded-2xl "
          style={{
            gridTemplateColumns: `repeat(${data?.totalMemberNum || 0 + 1}, 20px)`,
          }}
        >
          {items.slice(0, data?.totalMemberNum || 0 + 1).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center h-full"
              style={{ backgroundColor: item.color, color: item.color }}
            >
              {item.id}
            </div>
          ))}
        </div>

        <span>
          {data?.totalMemberNum}/{data?.totalMemberNum} 가능
        </span>
      </div>

      {/* 00~12시 */}
      <GridTime hours={hoursTo12} gridColors={morGridColors} />

      {/* 12~24시 */}
      <GridTime hours={hoursTo24} gridColors={afterGridColors} />
    </div>
  );
}
