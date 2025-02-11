export const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

export const format12Hour = (): string[] => {
  return Array.from({ length: 13 }, (_, i) => `${String(i).padStart(2, '0')}`);
};

export const format24Hour = (): string[] => {
  return Array.from(
    { length: 13 },
    (_, i) => `${String(i + 12).padStart(2, '0')}`,
  );
};

export const getTimeIndex = (timeString: string): number => {
  const time = timeString.split(' ')[1]; // YYYY-MM-DD HH:mm 형식에서 시간 추출
  const [hour, minute] = time.split(':').map(Number);
  return hour * 6 + Math.floor(minute / 10); // 10분 단위로 계산
};
