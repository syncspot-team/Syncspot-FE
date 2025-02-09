export interface IRecommendPlaceSearchResponseType {
  data: IPageResponse<IPlaceContent>;
}

interface IPageResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: ISort[];
  numberOfElements: number;
  pageable: IPageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IPlaceContent {
  name: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
  phoneNumber: string;
  placeUrl: string;
  placeStandard: string;
  distance: string;
}

interface ISort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface IPageable {
  offset: number;
  sort: ISort[];
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
