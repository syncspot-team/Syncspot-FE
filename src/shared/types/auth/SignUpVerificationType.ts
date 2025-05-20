export interface ISignUpRequestEmailVerificationType {
  email: string;
}

export interface ISignUpConfirmEmailVerificationType {
  email: string;
  code: string;
}

export interface ISignUpConfirmEmailVerificationResponseType {
  status: number;
  data: {
    isVerified: boolean;
  };
}
