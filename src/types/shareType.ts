export const SHARE_TYPE = {
  LOCATION_ENTER: '내 장소를 입력하고 중간 지점을 찾아보세요!',
  LOCATION_RESULT:
    '입력한 장소를 기준으로 중간 지점을 정했어요. 여기서 만날까요?',
  LOCATION_RECOMMENDATIONS: '중간 지점 근처에서 가기 좋은 장소를 추천해드려요!',
  PLACE_CREATE:
    '중간 지점 후보 중에서 고를 수 있도록 장소 투표 방을 만들어보세요.',
  PLACE_VOTE:
    '모임 장소를 결정해야 한다면? 중간 지점 후보 중에서 원하는 곳에 투표해 주세요.',
  PLACE_RESULT: '투표 완료! 이번 모임은 여기에서 만나요.',
  TIME_CREATE: '언제 만날지 정할 수 있도록 시간 투표 방을 만들어 보세요.',
  TIME_VOTE: '만날 수 있는 날짜와 시간을 투표해 주세요!',
  TIME_RESULT: '투표 결과! 이번 만남은 이때 진행돼요.',
  ABOUT: '싱크스팟 서비스와 팀 모락에 대해 알아보아요!',
} as const;

export type ShareType = (typeof SHARE_TYPE)[keyof typeof SHARE_TYPE];
