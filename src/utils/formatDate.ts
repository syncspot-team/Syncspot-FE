export const formatDate = (date: string) => {
  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error('잘못된 날짜 형식입니다.');
  }

  return dateObject;
};
