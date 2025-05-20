export interface IGetUserPresignedUrlResponse {
  status: number;
  data: {
    preSignedUrl: string;
    path: string;
  };
}
