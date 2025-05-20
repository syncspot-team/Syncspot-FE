export interface IPlaceVoteLookupResponseType {
  isSuccess: boolean;
  status: number;
  data: {
    existence: boolean;
    voteItem: number;
  };
}
