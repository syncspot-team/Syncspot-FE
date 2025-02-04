import * as yup from 'yup';

// 회원가입 유효성 검사 스키마
export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일을 입력해 주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  pw: yup
    .string()
    .required('비밀번호를 입력해 주세요')
    .min(6, '최소 6자리 이상이어야 합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
      '영문 대/소문자, 숫자, 특수문자(@$!%*#?&)가 포함되어야 합니다',
    ),
  confirmPw: yup
    .string()
    .required('비밀번호 확인을 입력해 주세요')
    .oneOf([yup.ref('pw')], '비밀번호가 일치하지 않습니다'),
  name: yup.string().required('이름을 입력해 주세요'),
  address: yup.string(),
  code: yup.string().required('인증번호를 입력해 주세요'),
});
