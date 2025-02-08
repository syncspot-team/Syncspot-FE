export interface IJoinedRoomCheckResponseType {
  timestamp: string;
  isSuccess: boolean;
  status: number;
  data: {
    exists: boolean;
  };
}
