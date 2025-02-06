import { PATH } from '@src/constants/path';
import { useRoomStore } from '@src/state/store/roomStore';
import { useNavigateWithRoomCheck } from './useNavigateWithRoomCheck';

export const useMenuItems = () => {
  const { roomId } = useRoomStore();
  const navigateWithRoomCheck = useNavigateWithRoomCheck();

  return [
    {
      label: '중간 지점 찾기',
      onClick: () => navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
      subMenus: [
        {
          label: '모임 생성',
          onClick: () => navigateWithRoomCheck(PATH.ONBOARDING),
        },
        {
          label: '장소 입력',
          onClick: () => navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
        },
        {
          label: '중간 지점 찾기 결과',
          onClick: () => navigateWithRoomCheck(PATH.LOCATION_RESULT(roomId)),
        },
      ],
    },
    {
      label: '장소 투표',
      onClick: () => navigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
      subMenus: [
        {
          label: '장소 투표 생성',
          onClick: () => navigateWithRoomCheck(PATH.PLACE_CREATE(roomId)),
        },
        {
          label: '장소 투표하기',
          onClick: () => navigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
        },
        {
          label: '장소 투표 결과',
          onClick: () => navigateWithRoomCheck(PATH.PLACE_RESULT(roomId)),
        },
      ],
    },
    {
      label: '시간 투표',
      onClick: () => navigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
      subMenus: [
        {
          label: '시간 투표 생성',
          onClick: () => navigateWithRoomCheck(PATH.TIME_CREATE(roomId)),
        },
        {
          label: '시간 투표하기',
          onClick: () => navigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
        },
        {
          label: '시간 투표 결과',
          onClick: () => navigateWithRoomCheck(PATH.TIME_RESULT(roomId)),
        },
      ],
    },
    {
      label: '서비스 소개',
      onClick: () => navigateWithRoomCheck(PATH.ABOUT),
    },
  ];
};
