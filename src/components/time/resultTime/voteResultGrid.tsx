import Arrow from '@src/assets/icons/IconTriangle.svg?react';
import { useGetTimeResultQuery } from '@src/state/queries/time';
import { items } from '@src/types/time/GridColor';
import { IMemberAvailability } from '@src/types/time/timeResultType';
import {
  format12Hour,
  format18Hour,
  format24Hour,
  format612Hour,
  format624Hour,
  format6Hour,
  getTimeIndex,
} from '@src/components/time/utils/formatTime';
import { mergeClassNames } from '@src/utils/mergeClassNames';
import { useEffect, useState } from 'react';
import GridTime from './gridTime';

interface VoteResultGridProps {
  isMobile: boolean;
}

export default function VoteResultGrid({ isMobile }: VoteResultGridProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 0-12
  const [morGridColors, setMorGridColors] = useState(
    Array(72).fill(items[0].color),
  );
  // 12-24
  const [afterGridColors, setAfterGridColors] = useState(
    Array(72).fill(items[0].color),
  );
  //0-6
  const [grid6Color, setGrid6Color] = useState(Array(36).fill(items[0].color));
  //6-12
  const [grid12Color, setGrid12Color] = useState(
    Array(36).fill(items[0].color),
  );
  //12-18
  const [grid18Color, setGrid18Color] = useState(
    Array(36).fill(items[0].color),
  );
  //18-24
  const [grid24Color, setGrid24Color] = useState(
    Array(36).fill(items[0].color),
  );

  const hoursTo6 = format6Hour();
  const hoursTo612 = format612Hour();
  const hoursTo18 = format18Hour();
  const hoursTo624 = format624Hour();
  const hoursTo12 = format12Hour();
  const hoursTo24 = format24Hour();

  const { data: resultData } = useGetTimeResultQuery();
  const data = resultData?.data;

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
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  useEffect(() => {
    logNowDateData();
  }, [data?.result, currentIndex]);

  // 막대그래프 색상 적용
  const fillGridColors = (nowDateData: IMemberAvailability[]) => {
    const morGridColors = Array(72).fill(items[0].color);
    const afterGridColors = Array(72).fill(items[0].color);
    const grid6Color = Array(36).fill(items[0].color);
    const grid12Color = Array(36).fill(items[0].color);
    const grid18Color = Array(36).fill(items[0].color);
    const grid24Color = Array(36).fill(items[0].color);

    // 시간대별 개수
    const morCount = Array(72).fill(0);
    const afterCount = Array(72).fill(0);
    const count6 = Array(36).fill(0);
    const count12 = Array(36).fill(0);
    const count18 = Array(36).fill(0);
    const count24 = Array(36).fill(0);

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

          // 0~6 범위
          if (startIndex < 36) {
            for (let i = startIndex; i < Math.min(endIndex, 36); i++) {
              count6[i]++;
            }
          }

          // 6~12 범위
          if (endIndex > 36 && startIndex < 72) {
            for (
              let i = Math.max(startIndex - 36, 0);
              i < Math.min(endIndex - 36, 36);
              i++
            ) {
              count12[i]++;
            }
          }

          // 12~18 범위
          if (endIndex > 72 && startIndex < 108) {
            for (
              let i = Math.max(startIndex - 72, 0);
              i < Math.min(endIndex - 72, 36);
              i++
            ) {
              count18[i]++;
            }
          }

          // 18~24 범위
          if (endIndex > 108) {
            for (
              let i = Math.max(startIndex - 108, 0);
              i < Math.min(endIndex - 108, 36);
              i++
            ) {
              count24[i]++;
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
    count6.forEach((count, index) => {
      if (count > 0) {
        grid6Color[index] = items[Math.min(count, items.length - 1)].color;
      }
    });
    count12.forEach((count, index) => {
      if (count > 0) {
        grid12Color[index] = items[Math.min(count, items.length - 1)].color;
      }
    });
    count18.forEach((count, index) => {
      if (count > 0) {
        grid18Color[index] = items[Math.min(count, items.length - 1)].color;
      }
    });
    count24.forEach((count, index) => {
      if (count > 0) {
        grid24Color[index] = items[Math.min(count, items.length - 1)].color;
      }
    });

    return {
      morGridColors,
      afterGridColors,
      grid6Color,
      grid12Color,
      grid18Color,
      grid24Color,
    };
  };

  const logNowDateData = () => {
    const nowDateKey = dateKeys[currentIndex];
    const nowDateData: IMemberAvailability[] = data?.result[nowDateKey] || [];
    const {
      morGridColors,
      afterGridColors,
      grid6Color,
      grid12Color,
      grid18Color,
      grid24Color,
    } = fillGridColors(nowDateData);
    setMorGridColors(morGridColors);
    setAfterGridColors(afterGridColors);
    setGrid6Color(grid6Color);
    setGrid12Color(grid12Color);
    setGrid18Color(grid18Color);
    setGrid24Color(grid24Color);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:gap-8">
      <div className="flex items-center mx-auto mt-4 lg:mt-8 justify-evenly">
        <button
          onClick={handlePrev}
          className={mergeClassNames(
            currentIndex === 0 ? 'text-gray-light' : 'text-blue-normal01',
          )}
          disabled={currentIndex === 0}
        >
          <Arrow className="text-title " />
        </button>
        <p className="font-bold text-center text-subtitle text-blue-dark02">
          {formattedDates[currentIndex]}
        </p>
        <button
          onClick={handleNext}
          className={mergeClassNames(
            currentIndex === formattedDates.length - 1
              ? 'text-gray-light'
              : 'text-blue-normal01',
          )}
          disabled={currentIndex === formattedDates.length - 1}
        >
          <Arrow className="rotate-180 text-title" />
        </button>
      </div>

      {/* 인원 */}
      <div className="flex flex-row items-center justify-center w-full gap-3 mx-auto ">
        <span>0/0 가능</span>
        <div
          className="grid h-10 overflow-hidden border-2 border-blue-normal01 rounded-2xl "
          style={{
            gridTemplateColumns: `repeat(${(data?.totalMemberNum || 0) + 1}, 20px)`,
          }}
        >
          {items.slice(0, (data?.totalMemberNum || 0) + 1).map((item) => (
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
      {!isMobile ? (
        <>
          {/* 00~12시 */}
          <GridTime hours={hoursTo12} gridColors={morGridColors} gridSize={6} />

          {/* 12~24시 */}
          <GridTime
            hours={hoursTo24}
            gridColors={afterGridColors}
            gridSize={6}
          />
        </>
      ) : (
        <>
          {/* 6시간 */}
          <GridTime hours={hoursTo6} gridColors={grid6Color} gridSize={3} />
          <GridTime hours={hoursTo612} gridColors={grid12Color} gridSize={3} />
          <GridTime hours={hoursTo18} gridColors={grid18Color} gridSize={3} />
          <GridTime hours={hoursTo624} gridColors={grid24Color} gridSize={3} />
        </>
      )}
    </div>
  );
}
