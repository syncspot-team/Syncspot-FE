export const API = {
  SIGN_UP: '/api/members', // 회원가입
  SIGN_UP_REQUEST_EMAIL_VERIFICATION:
    '/api/members/verification-request/signup', // 회원가입 이메일 인증 요청
  SIGN_UP_CONFIRM_EMAIL_VERIFICATION: '/api/members/verification/signup', // 회원가입 이메일 인증 확인
  SIGN_IN: '/api/members/login', // 로그인
  LOGOUT: '/api/members/logout', // 로그아웃
  JOINED_ROOMS_SEARCH: '/api/member-rooms', // 사용자가 참여한 방 목록 검색
  JOINED_ROOM_CHECK: (roomId: string) =>
    `/api/member-rooms/exists/rooms/${roomId}`, // 사용자가 방 회원인지 확인
  SAVE_USER_TO_ROOM: (roomId: string) => `/api/member-rooms/rooms/${roomId}`, // 사용자를 방에 저장
  MIDPOINTS_SEARCH: (roomId: string) => `/api/mid-points/rooms/${roomId}`, // 중간 지점 장소 목록 검색
  PLACE_SEARCH: (roomId: string) => `/api/places/rooms/${roomId}`, // 특정 방에 입력한 장소 목록들 조회
  PLACE_SAVE: (roomId: string) => `/api/places/rooms/${roomId}`, // 특정 방에 입력한 장소 저장
  PLACE_UPDATE: (roomId: string) => `/api/places/rooms/${roomId}`, // 특정 방에 입력한 장소 수정
  PLACE_DELETE: (placeId: number) => `/api/places/${placeId}`, // 특정 방에 입력한 장소 삭제
  PLACE_VOTE_RESULT: (roomId: string) =>
    `/api/place-votes/result/rooms/${roomId}`, // 특정 방의 장소 투표 결과 조회
  PLACE_REVOTE: (roomId: string) => `/api/place-votes/rooms/${roomId}`, // 특정 방의 장소 재투표
  PLACE_VOTE: (roomId: string) => `/api/place-votes/rooms/${roomId}`, // 특정 방의 장소 투표
  PLACE_VOTE_LOOKUP: (roomId: string) =>
    `/api/place-votes/voted/rooms/${roomId}`, // 특정 방의 장소 투표 여부 및 투표 항목 조회
  PLACE_VOTE_ROOM_CHECK: (roomId: string) =>
    `/api/place-vote-rooms/rooms/${roomId}`, // 특정 방의 장소 투표방 존재 여부 확인
  PLACE_VOTE_ROOM_UPDATE: (roomId: string) =>
    `/api/place-vote-rooms/rooms/${roomId}`, // 특정 방의 장소 투표방 업데이트
  PLACE_VOTE_ROOM_CREATE: (roomId: string) =>
    `/api/place-vote-rooms/rooms/${roomId}`, // 특정 방의 장소 투표방 생성
  RECOMMEND_PLACE_SEARCH: '/api/recommend-places', // 특정 중간 지점 장소를 기준으로 식당, 스터티 카페, 카페 추천
  ROOM_CREATE: '/api/rooms', // 방 생성
  ROOM_NAME_CHANGE: (roomId: string) => `/api/rooms/${roomId}`, // 방 이름 변경
  ROOM_EXISTS_CHECK: (roomId: string) => `/api/rooms/${roomId}/existence`, // 방 존재 여부 확인
  TIME_VOTE_RESULT: (roomId: string) =>
    `/api/time-votes/result/rooms/${roomId}`, // 특정 방의 시간 투표 결과 조회
  TIME_REVOTE: (roomId: string) => `/api/time-votes/rooms/${roomId}`, // 특정 방의 시간 재투표
  TIME_VOTE: (roomId: string) => `/api/time-votes/rooms/${roomId}`, // 특정 방의 시간 투표
  TIME_VOTE_LOOKUP: (roomId: string) => `/api/time-votes/voted/rooms/${roomId}`, // 특정 방의 시간 투표 여부 및 투표 항목 조회
  TIME_VOTE_ROOM_CHECK: (roomId: string) =>
    `/api/time-vote-rooms/rooms/${roomId}`, // 특정 방의 시간 투표방 존재 여부 확인
  TIME_VOTE_ROOM_UPDATE: (roomId: string) =>
    `/api/time-vote-rooms/rooms/${roomId}`, // 특정 방의 시간 투표방 업데이트
  TIME_VOTE_ROOM_CREATE: (roomId: string) =>
    `/api/time-vote-rooms/rooms/${roomId}`, // 특정 방의 시간 투표방 생성
} as const;
