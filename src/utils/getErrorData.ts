import { AxiosError } from 'axios';

type ErrorCodeType = {
  [key: string]: { status: string; message: string };
};

const ERROR_CODE: ErrorCodeType = {
  // 백엔드에서 정의한 에러
  'C-101': {
    status: '401',
    message: '인증에 실패하였습니다.',
  },
  'A-003': {
    status: '401',
    message: 'Refresh Token이 만료되었습니다.',
  },
  'A-004': {
    status: '402',
    message: 'Access Token을 재발급해야합니다.',
  },
  'MR-003': { status: '403', message: '해당 방의 회원이 아닙니다.' },
  'M-004': { status: '403', message: '인증코드가 일치하지 않습니다.' },
  'M-005': { status: '403', message: '비밀번호가 일치하지 않습니다.' },
  'R-201': { status: '404', message: '존재하지 않는 방입니다.' },
  'P-201': { status: '404', message: '방에 입력된 장소가 없습니다.' },
  'V-202': { status: '404', message: '생성된 투표방이 없습니다.' },
  'V-101': { status: '404', message: '투표 후보가 아닙니다.' },
  'V-201': { status: '404', message: '투표를 한 적이 없습니다.' },
  'M-001': { status: '409', message: '이미 존재하는 이메일입니다.' },
  'MR-002': { status: '409', message: '해당 방에 이미 존재하는 회원입니다.' },
  'V-301': { status: '409', message: '이미 투표를 하였습니다.' },
  'V-302': { status: '409', message: '이미 투표방이 존재합니다.' },
  'C-203': { status: '429', message: '요청을 너무 많이 했습니다.' },
  'E-001': { status: '500', message: '이메일 전송에 실패하였습니다.' },

  // axios 에러
  ERR_NETWORK: {
    status: '네트워크 에러',
    message:
      '서버가 응답하지 않습니다. \n프로그램을 재시작하거나 관리자에게 연락하세요.',
  },
  ECONNABORTED: {
    status: '요청 시간 초과',
    message: '요청 시간을 초과했습니다.',
  },

  // 알 수 없는 에러
  UNKNOWN: { status: 'ERROR', message: '알 수 없는 오류가 발생했습니다.' },
} as const;

export const getErrorData = (
  error: AxiosError<{
    status: number;
    error: string;
    code: string;
    reason: string[];
  }>,
) => {
  const serverErrorCode = error?.response?.data?.code ?? '';
  const axiosErrorCode = error?.code ?? '';
  console.log(error);

  if (serverErrorCode === 'C-202') {
    return {
      status: '400',
      message:
        error?.response?.data?.reason[0] ?? '요청 파라미터가 잘못되었습니다.',
    };
  } else if (serverErrorCode in ERROR_CODE) {
    return ERROR_CODE[serverErrorCode as keyof typeof ERROR_CODE];
  } else if (axiosErrorCode in ERROR_CODE) {
    return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
  } else return ERROR_CODE.UNKNOWN;
};
