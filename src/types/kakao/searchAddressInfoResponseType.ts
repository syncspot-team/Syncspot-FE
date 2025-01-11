export interface KakaoAddressResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: Array<{
    address_name: string; // 전체 지번 주소 또는 전체 도로명 주소
    address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR'; // 주소 타입
    x: string; // X 좌표값, 경위도인 경우 경도(longitude)
    y: string; // Y 좌표값, 경위도인 경우 위도(latitude)
    address: {
      address_name: string; // 전체 지번 주소
      region_1depth_name: string; // 지역 1 Depth, 시도 단위
      region_2depth_name: string; // 지역 2 Depth, 구 단위
      region_3depth_name: string; // 지역 3 Depth, 동 단위
      region_3depth_h_name: string; // 지역 3 Depth, 행정동 명칭
      h_code: string; // 행정 코드
      b_code: string; // 법정 코드
      mountain_yn: 'Y' | 'N'; // 산 여부
      main_address_no: string; // 지번 주번지
      sub_address_no: string; // 지번 부번지
      x: string; // X 좌표값
      y: string; // Y 좌표값
    };
    road_address?: {
      // 도로명 주소 상세 정보
      address_name: string; // 전체 도로명 주소
      region_1depth_name: string; // 지역 1Depth, 시도 단위
      region_2depth_name: string; // 지역 2Depth, 구 단위
      region_3depth_name: string; // 지역 3Depth, 동 단위
      road_name: string; // 도로명
      underground_yn: 'Y' | 'N'; // 지하 여부
      main_building_no: string; // 건물 본번
      sub_building_no: string; // 건물 부번
      building_name: string; // 건물명
      zone_no: string; // 우편번호
      x: string; // X 좌표값
      y: string; // Y 좌표값
    };
  }>;
}
