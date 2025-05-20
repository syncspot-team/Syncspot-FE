export interface ITimeVoteRequest {
  roomId?: string;
  dateTime: {
    memberAvailableStartTime: string;
    memberAvailableEndTime: string;
  }[];
}

export interface ITimeVoteResponse {
  status: number;
  data: {};
}
