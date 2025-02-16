export const formatDate = (date: string) => {
  // yyyy-mm-dd 문자열
  const [year, month, day] = date.split('-').map(Number);

  // Date 객체에서 month는 0부터 시작하므로 -1
  const dateObject = new Date(year, month - 1, day);

  if (isNaN(dateObject.getTime())) {
    throw new Error('잘못된 날짜 형식입니다.');
  }

  return dateObject;
};

export const formatStringDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
