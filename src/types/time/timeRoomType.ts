export interface ITimeRoomRequest {
  roomId?: string;
  dates: string[];
}

export interface ITimeRoomResponse {
  status: number;
  data: {
    id: string;
  };
}
