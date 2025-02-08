export interface IMidpointDataResponseType {
  name: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

export interface IMidpointSearchResponseType {
  isSuccess: boolean;
  status: number;
  data: IMidpointDataResponseType[];
}
