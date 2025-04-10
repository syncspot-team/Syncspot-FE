import { items } from '@src/types/time/GridColor';
import { getTimeIndex } from '@src/components/time/utils/formatTime';
import { IMemberAvailability } from '@src/types/time/timeResultType';

export const fillGridColors = (nowDateData: IMemberAvailability[]) => {
  const morGridColors = Array(72).fill(items[0].color);
  const afterGridColors = Array(72).fill(items[0].color);
  const grid6Color = Array(36).fill(items[0].color);
  const grid12Color = Array(36).fill(items[0].color);
  const grid18Color = Array(36).fill(items[0].color);
  const grid24Color = Array(36).fill(items[0].color);

  const morCount = Array(72).fill(0);
  const afterCount = Array(72).fill(0);
  const count6 = Array(36).fill(0);
  const count12 = Array(36).fill(0);
  const count18 = Array(36).fill(0);
  const count24 = Array(36).fill(0);

  nowDateData.forEach((item) => {
    const {
      memberAvailableStartTime: startTime,
      memberAvailableEndTime: endTime,
    } = item.dateTime;
    const startIndex = getTimeIndex(startTime);
    const endIndex = getTimeIndex(endTime);

    // 각 시간대별 색상 채우기
    if (startIndex >= 0 && startIndex <= 72) {
      for (let i = startIndex; i < Math.min(endIndex, 72); i++) {
        morCount[i]++;
      }
    }
    if (endIndex > 72) {
      for (
        let i = Math.max(startIndex - 72, 0);
        i < Math.min(endIndex - 72, 72);
        i++
      ) {
        afterCount[i]++;
      }
    }
    if (startIndex < 36) {
      for (let i = startIndex; i < Math.min(endIndex, 36); i++) {
        count6[i]++;
      }
    }
    if (endIndex > 36 && startIndex < 72) {
      for (
        let i = Math.max(startIndex - 36, 0);
        i < Math.min(endIndex - 36, 36);
        i++
      ) {
        count12[i]++;
      }
    }
    if (endIndex > 72 && startIndex < 108) {
      for (
        let i = Math.max(startIndex - 72, 0);
        i < Math.min(endIndex - 72, 36);
        i++
      ) {
        count18[i]++;
      }
    }
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

  const applyColors = (counts: number[], gridColors: string[]) => {
    counts.forEach((count, index) => {
      if (count > 0) {
        gridColors[index] = items[Math.min(count, items.length - 1)].color;
      }
    });
  };

  applyColors(morCount, morGridColors);
  applyColors(afterCount, afterGridColors);
  applyColors(count6, grid6Color);
  applyColors(count12, grid12Color);
  applyColors(count18, grid18Color);
  applyColors(count24, grid24Color);

  return {
    morGridColors,
    afterGridColors,
    grid6Color,
    grid12Color,
    grid18Color,
    grid24Color,
  };
};
