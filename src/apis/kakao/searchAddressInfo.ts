import { kakaoInstance } from '@src/apis/kakaoInstance';
import { KakaoAddressResponse } from '@src/types/kakao/searchAddressInfoResponseType';

export const searchAddressInfo = async (address: string) => {
  try {
    const { data } = await kakaoInstance.get<KakaoAddressResponse>(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    );
    return data.documents[0];
  } catch (e) {
    throw e;
  }
};
