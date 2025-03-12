export interface IGetUserInfoResponse {
  status: number;
  data: {
    email: string;
    name: string;
    existAddress: string;
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLatitude: number;
    addressLongitude: number;
    isOauth: boolean;
  };
}
