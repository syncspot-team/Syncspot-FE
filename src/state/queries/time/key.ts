export const TIME_KEY = {
  GET_TIME_DATES: (roomId: string) => ['timeDates', roomId],
  GET_TIME_LOOKUP: (roomId: string) => ['timeVoteLookup', roomId],
  GET_TIME_RESULT: (roomId: string) => ['timeVoteResult', roomId],
};
