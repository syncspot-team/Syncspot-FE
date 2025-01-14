export interface ISignUpRequest {
  name: string;
  email: string;
  pw: string;
  existAddress?: boolean;
  siDo?: string;
  siGunGu?: string;
  roadNameAddress?: string;
  addressLatitude?: number;
  addressLongitude?: number;
}

export interface ISignUpFormValues extends ISignUpRequest {
  confirmPw: string;
}
