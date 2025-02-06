export interface ILocation {
  placeId: number;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

export interface IPlaceSearchData {
  myLocationExistence: boolean;
  myLocations: ILocation[];
  friendLocationExistence: boolean;
  friendLocations: ILocation[];
}

export interface IPlaceSearchResponseType {
  isSuccess: boolean;
  status: number;
  data: IPlaceSearchData;
}
