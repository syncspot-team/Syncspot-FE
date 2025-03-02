export const MODAL_TYPE = {
  RECREATE_VOTE_MODAL: 'RECREATE_VOTE_MODAL', // 투표 재생성
  SHARE_MEETING_MODAL: 'SHARE_MEETING_MODAL', // 모임 공유
  ROOM_DETAIL_INFO_MODAL: 'ROOM_DETAIL_INFO_MODAL', // 모임 상세 정보
  TIME_RESULT_MODAL: 'TIME_RESULT_MODAL', //날짜별 시간투표 결과
  QUIT_MODAL: 'QUIT_MODAL', // 계정 삭제
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
