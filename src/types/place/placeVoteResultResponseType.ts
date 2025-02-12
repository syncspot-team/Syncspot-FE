export interface PlaceVoteResultResponseType {
  isSuccess: boolean;
  status: number;
  data: PlaceVoteResultDataType[];
}

export interface PlaceVoteResultDataType {
  id: number;
  name: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
  count: number;
  voters: string[];
}
