export const MODAL_TYPE = {
  RECREATE_VOTE_MODAL: 'RECREATE_VOTE_MODAL', // 투표 재생성
  SHARE_MEETING_MODAL: 'SHARE_MEETING_MODAL', // 모임 공유
  ROOM_DETAIL_INFO_MODAL: 'ROOM_DETAIL_INFO_MODAL', // 모임 상세 정보
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
