import { ISignUpFormValues } from '@shared/types/auth/SignUpRequestType';

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
