export interface IGetRoomDetailInfoResponseType {
  isSuccess: boolean;
  status: number;
  data: {
    name: string;
    memo: string;
    memberCount: number;
    emails: string[];
  };
}
