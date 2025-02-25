export const SHARE_TYPE = {
  LOCATION_ENTER: '나의 장소를 입력해서 중간 지점을 찾아보세요!',
  LOCATION_RESULT:
    '입력한 장소에 따라 중간 지점을 계산했어요. 이 중에서 만나요!',
  LOCATION_RECOMMENDATIONS:
    '계산된 중간지점 근처의 방문할 만한 장소를 추천해요.',
  PLACE_CREATE:
    '여러 중간 지점 중에 만남을 원하는 장소를 투표하는 방을 만들어 주세요.',
  PLACE_VOTE: '만남을 원하는 장소를 투표해 주세요.',
  PLACE_RESULT: '여러 중간 지점 중 여기에서 만나요!',
  TIME_CREATE:
    '언제 만날지 날짜와 시간을 정해 보아요. 투표하는 방을 만들어 주세요.',
  TIME_VOTE: '만날 수 있는 날짜와 시간을 투표해 주세요.',
  TIME_RESULT: '여러 날짜 중 이때 만나요!',
  ABOUT: 'about',
} as const;

export type ShareType = (typeof SHARE_TYPE)[keyof typeof SHARE_TYPE];
