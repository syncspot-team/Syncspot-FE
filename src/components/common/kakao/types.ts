import { KakaoKeywordSearchResponse } from '@src/shared/types/kakao/searchPlacesByKeywordResponseType';
import { KakaoAddressSearchResponse } from '@src/shared/types/kakao/searchAddressInfoResponseType';

export type Place = KakaoKeywordSearchResponse['documents'][0];
export type Address = KakaoAddressSearchResponse['documents'][0];

export interface ISelectedLocation {
  place: Place;
  address: Address | null;
}
