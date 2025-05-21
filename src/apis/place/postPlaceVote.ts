import { API } from '@shared/constants';
import { IPlaceVoteRequestType } from '@shared/types/place/placeVoteRequestType';
import { getAPIResponseData } from '@shared/utils';

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
