import { ISignInRequest } from './SignInRequestType';

export interface ISignUpRequest extends ISignInRequest {
  confirmPw: string;
  name: string;
  existAddress?: boolean;
  siDo?: string;
  siGunGu?: string;
  roadNameAddress?: string;
  addressLatitude?: number;
  addressLongitude?: number;
}
