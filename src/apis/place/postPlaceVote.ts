import { API } from '@src/shared/constants';
import { IPlaceVoteRequestType } from '@src/shared/types/place/placeVoteRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const postPlaceVote = async (
  roomId: string,
  placeVotePayload: IPlaceVoteRequestType,
) => {
  return getAPIResponseData<void, IPlaceVoteRequestType>({
    method: 'POST',
    url: API.PLACE_VOTE(roomId),
    data: placeVotePayload,
    params: {
      roomId,
    },
  });
};
