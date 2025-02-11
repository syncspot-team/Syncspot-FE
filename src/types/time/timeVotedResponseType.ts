export interface ITimeVotedResponseType {
  myVotesExistence: boolean;
  myVotes: [
    {
      memberAvailableStartTime: string;
      memberAvailableEndTime: string;
    },
  ];
}
