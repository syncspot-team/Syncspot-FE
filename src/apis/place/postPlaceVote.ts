import { API } from '@src/constants/api';
import { IPlaceVoteRequestType } from '@src/types/place/placeVoteRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
