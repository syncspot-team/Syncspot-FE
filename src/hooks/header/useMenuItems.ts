import { PATH } from '@src/constants/path';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { useNavigateWithRoomCheck } from './useNavigateWithRoomCheck';

export const useMenuItems = (callback?: () => void) => {
  const { roomId } = useRoomIdStore();
  const navigateWithRoomCheck = useNavigateWithRoomCheck();

  return [
    {
      label: '중간 지점 찾기',
      onClick: () =>
        navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId), callback),
      subMenus: [
        {
          label: '모임 생성',
          onClick: () => navigateWithRoomCheck(PATH.ONBOARDING, callback),
        },
        {
          label: '장소 입력',
          onClick: () =>
            navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId), callback),
        },
        {
          label: '중간 지점 찾기 결과',
          onClick: () =>
            navigateWithRoomCheck(PATH.LOCATION_RESULT(roomId), callback),
        },
      ],
    },
    {
      label: '장소 투표',
      onClick: () => navigateWithRoomCheck(PATH.PLACE_VOTE(roomId), callback),
      subMenus: [
        {
          label: '장소 투표 생성',
          onClick: () =>
            navigateWithRoomCheck(PATH.PLACE_CREATE(roomId), callback),
        },
        {
          label: '장소 투표하기',
          onClick: () =>
            navigateWithRoomCheck(PATH.PLACE_VOTE(roomId), callback),
        },
        {
          label: '장소 투표 결과',
          onClick: () =>
            navigateWithRoomCheck(PATH.PLACE_RESULT(roomId), callback),
        },
      ],
    },
    {
      label: '시간 투표',
      onClick: () => navigateWithRoomCheck(PATH.TIME_VOTE(roomId), callback),
      subMenus: [
        {
          label: '시간 투표 생성',
          onClick: () =>
            navigateWithRoomCheck(PATH.TIME_CREATE(roomId), callback),
        },
        {
          label: '시간 투표하기',
          onClick: () =>
            navigateWithRoomCheck(PATH.TIME_VOTE(roomId), callback),
        },
        {
          label: '시간 투표 결과',
          onClick: () =>
            navigateWithRoomCheck(PATH.TIME_RESULT(roomId), callback),
        },
      ],
    },
    {
      label: '서비스 소개',
      onClick: () => navigateWithRoomCheck(PATH.ABOUT, callback),
    },
  ];
};
