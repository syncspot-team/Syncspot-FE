export interface ISignInResponse {
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
