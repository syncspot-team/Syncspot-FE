import { PATH } from '@src/constants/path';
import { useRoomStore } from '@src/state/store/roomStore';
import { useNavigateWithRoomCheck } from './useNavigateWithRoomCheck';
import { useGetCheckLocationEnterQuery } from '@src/state/queries/header/useGetCheckLocationEnterQuery';
import { useGetPlaceVoteRoomExistsQuery } from '@src/state/queries/header/useGetPlaceVoteRoomExistsQuery';
import { useGetTimeViteRoomExistsQuery } from '@src/state/queries/header/useGetTimeViteRoomExistsQuery';
import { useGetPlaceVotedQuery } from '@src/state/queries/header/useGetPlaceVotedQuery';
import { useGetTimeVotedQuery } from '@src/state/queries/header/useGetTimeVotedQuery';

export const useMenuItems = () => {
  const { roomId } = useRoomStore();
  const navigateWithRoomCheck = useNavigateWithRoomCheck();
  const { data: placeSearchResponse } = useGetCheckLocationEnterQuery();
  const { data: placeVoteRoomExists } = useGetPlaceVoteRoomExistsQuery();
  const { data: timeVoteRoomExists } = useGetTimeViteRoomExistsQuery();
  const { data: placeVoted } = useGetPlaceVotedQuery({
    enabled: !!placeVoteRoomExists?.data.existence,
  });
  const { data: timeVoted } = useGetTimeVotedQuery({
    enabled: !!timeVoteRoomExists?.data.existence,
  });

  return [
    {
      label: '중간 지점 찾기',
      onClick: () => navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
      subMenus: [
        {
          label: '내 장소 입력',
          onClick: () => navigateWithRoomCheck(PATH.LOCATION_ENTER(roomId)),
        },
        ...(placeSearchResponse?.data.myLocationExistence ||
        placeSearchResponse?.data.friendLocationExistence
          ? [
              {
                label: '중간 지점 찾기 결과',
                onClick: () =>
                  navigateWithRoomCheck(PATH.LOCATION_RESULT(roomId)),
              },
            ]
          : []),
      ],
    },
    {
      label: '장소 투표',
      onClick: () => navigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
      subMenus: [
        {
          label: placeVoteRoomExists?.data.existence
            ? '장소 새 투표 생성'
            : '장소 투표 생성',
          onClick: () => navigateWithRoomCheck(PATH.PLACE_CREATE(roomId)),
        },
        ...(placeVoteRoomExists?.data.existence
          ? [
              {
                label: placeVoted?.data.existence
                  ? '장소 재투표하기'
                  : '장소 투표하기',
                onClick: () => navigateWithRoomCheck(PATH.PLACE_VOTE(roomId)),
              },
              {
                label: '장소 투표 결과',
                onClick: () => navigateWithRoomCheck(PATH.PLACE_RESULT(roomId)),
              },
            ]
          : []),
      ],
    },
    {
      label: '시간 투표',
      onClick: () => navigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
      subMenus: [
        {
          label: timeVoteRoomExists?.data.existence
            ? '시간 새 투표 생성'
            : '시간 투표 생성',
          onClick: () => navigateWithRoomCheck(PATH.TIME_CREATE(roomId)),
        },
        ...(timeVoteRoomExists?.data.existence
          ? [
              {
                label: timeVoted?.data.myVotesExistence
                  ? '시간 재투표하기'
                  : '시간 투표하기',
                onClick: () => navigateWithRoomCheck(PATH.TIME_VOTE(roomId)),
              },
              {
                label: '시간 투표 결과',
                onClick: () => navigateWithRoomCheck(PATH.TIME_RESULT(roomId)),
              },
            ]
          : []),
      ],
    },
    {
      label: '서비스 소개',
      onClick: () => navigateWithRoomCheck(PATH.ABOUT),
    },
  ];
};
