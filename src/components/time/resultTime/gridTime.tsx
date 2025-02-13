import { ITimeGridProps } from '@src/types/time/timeProps';
import { mergeClassNames } from '@src/utils/mergeClassNames';

export default function GridTime({ hours, gridColors }: ITimeGridProps) {
  return (
    <div className="flex flex-col w-[80%] mt-4 ">
      {/* 시간 표시 */}
      <div className="flex justify-between w-full mb-1 ">
        {hours.map((hour, index) => (
          <div key={index} className="text-center">
            {hour}
          </div>
        ))}
      </div>

      {/* 그리드 */}
      <div
        className="grid w-full overflow-hidden border-2 h-14 border-blue-normal01 rounded-2xl"
        style={{ gridTemplateColumns: `repeat(72, 1fr)` }}
      >
        {gridColors.map((color, index) => (
          <div
            key={index}
            className={mergeClassNames(
              'h-full flex items-center justify-center border-blue-normal01 border-l',
              index % 6 === 0 && index !== 0
                ? 'border-l-2'
                : 'border-l border-dashed ',
            )}
            style={{ backgroundColor: color }}
          >
            {/* 내부는 비어 있음 */}
          </div>
        ))}
      </div>
    </div>
  );
}
