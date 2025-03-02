export const TIME_FORMAT = {
  KO: 'ko',
  SLASH: 'slash',
};

export const formatTime = (time: number) => time.toString().padStart(2, '0');

export const formatStringTime = (
  time: string,
  format: (typeof TIME_FORMAT)[keyof typeof TIME_FORMAT] = TIME_FORMAT.KO,
) => {
  const [hour, minute] = time.split(' ')[1].split(':');

  if (format === TIME_FORMAT.SLASH) {
    return `${hour}:${minute}`;
  }

  return `${hour}시 ${minute}분`;
};

export const format12Hour = (): string[] => {
  return Array.from({ length: 13 }, (_, i) => `${String(i).padStart(2, '0')}`);
};

export const format24Hour = (): string[] => {
  return Array.from(
    { length: 13 },
    (_, i) => `${String(i + 12).padStart(2, '0')}`,
  );
};

export const format6Hour = (): string[] => {
  return Array.from({ length: 7 }, (_, i) => `${String(i).padStart(2, '0')}`);
};
export const format612Hour = (): string[] => {
  return Array.from(
    { length: 7 },
    (_, i) => `${String(i + 6).padStart(2, '0')}`,
  );
};
export const format18Hour = (): string[] => {
  return Array.from(
    { length: 7 },
    (_, i) => `${String(i + 12).padStart(2, '0')}`,
  );
};
export const format624Hour = (): string[] => {
  return Array.from(
    { length: 7 },
    (_, i) => `${String(i + 18).padStart(2, '0')}`,
  );
};

export const getTimeIndex = (timeString: string): number => {
  const time = timeString.split(' ')[1]; // YYYY-MM-DD HH:mm 형식에서 시간 추출
  const [hour, minute] = time.split(':').map(Number);
  return hour * 6 + Math.floor(minute / 10); // 10분 단위로 계산
};
