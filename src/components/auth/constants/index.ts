import { ISignUpFormValues } from '@src/types/auth/SignUpRequestType';

export const SignUpDefaultValues: ISignUpFormValues = {
  name: '',
  email: '',
  code: '',
  pw: '',
  confirmPw: '',
  existAddress: false,
  siDo: '',
  siGunGu: '',
  roadNameAddress: '',
  addressLatitude: 0,
  addressLongitude: 0,
};
