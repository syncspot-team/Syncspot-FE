export interface ITimeResultResponseType {
  result: {
    //DB 날짜별 배열, 키
    [date: string]: IMemberAvailability[];
  };
  totalMemberNum?: number;
}

export interface IMemberAvailability {
  memberName: string;
  dateTime: {
    memberAvailableStartTime: string;
    memberAvailableEndTime: string;
  }[];
}
