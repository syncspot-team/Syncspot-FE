export interface KakaoPlacesResponse {
  meta: {
    total_count: number; // 검색어에 검색된 문서 수
    pageable_count: number; // total_count 중 노출 가능 문서 수
    is_end: boolean; // 현재 페이지가 마지막 페이지인지 여부
    same_name: {
      region: string[]; // 질의어에서 인식된 지역의 리스트
      keyword: string; // 질의어에서 지역 정보를 제외한 키워드
      selected_region: string; // 인식된 지역 리스트 중, 현재 검색에 사용된 지역 정보
    };
  };
  documents: Array<{
    id: string; // 장소 ID
    place_name: string; // 장소명, 업체명
    category_name: string; // 카테고리 이름
    category_group_code: string; // 중요 카테고리만 그룹핑한 카테고리 그룹 코드
    category_group_name: string; // 중요 카테고리만 그룹핑한 카테고리 그룹명
    phone: string; // 전화번호
    address_name: string; // 전체 지번 주소
    road_address_name: string; // 전체 도로명 주소
    x: string; // X 좌표값, 경위도인 경우 longitude
    y: string; // Y 좌표값, 경위도인 경우 latitude
    place_url: string; // 장소 상세페이지 URL
    distance?: string; // 중심좌표까지의 거리(x,y 파라미터를 준 경우에만 존재)
  }>;
}
