export interface IExamQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export interface IExam {
  id: number;
  title: string;
  questions: IExamQuestion[];
}

// 더미 데이터 정의
const mockExamData: IExam = {
  id: 1,
  title: '모의고사 1회',
  questions: [
    {
      id: 1,
      question: '샘플 문제 1',
      options: ['보기 1', '보기 2', '보기 3', '보기 4'],
      answer: 1,
    },
    {
      id: 2,
      question: '샘플 문제 2',
      options: ['보기 1', '보기 2', '보기 3', '보기 4'],
      answer: 2,
    },
  ],
};

export const getExam = async (): Promise<IExam> => {
  // 5초 지연 후 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExamData);
    }, 5000);
  });
};
