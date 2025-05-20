export interface ITimeVotedResponseType {
  isSuccess: boolean;
  status: number;
  data: ITimeVoted;
}
export interface ITimeVoted {
  myVotesExistence: boolean;
  myVotes: [
    {
      memberAvailableStartTime: string;
      memberAvailableEndTime: string;
    },
  ];
}
