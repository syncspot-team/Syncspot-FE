import { kakaoInstance } from '@src/apis/kakaoInstance';
import { KakaoPlacesResponse } from '@src/types/kakao/searchPlacesByKeywordResponseType';

export const searchPlacesByKeyword = async (query: string) => {
  try {
    const { data } = await kakaoInstance.get<KakaoPlacesResponse>(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`,
    );
    return data.documents;
  } catch (e) {
    throw e;
  }
};
