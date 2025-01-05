export interface IRoom {
  roomId: string;
  roomName: string;
}

export interface IJoinRoomResponse {
  data: IRoom[];
}
