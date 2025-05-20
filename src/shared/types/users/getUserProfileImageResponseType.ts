export interface IGetUserProfileImageResponse {
  status: number;
  data: {
    isExist: boolean;
    url: string;
  };
}
