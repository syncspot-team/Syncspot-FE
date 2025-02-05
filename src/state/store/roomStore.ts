import { create } from 'zustand';

const SELECTED_ROOM_ID = 'selectedRoomId';
const SELECTED_ROOM_NAME = 'selectedRoomName';

interface IRoomIdState {
  roomId: string;
  roomName: string;
  setRoomId: (roomId: string) => void;
  setRoomName: (roomName: string) => void;
}

export const useRoomIdStore = create<IRoomIdState>((set) => ({
  roomId: localStorage.getItem(SELECTED_ROOM_ID) || '',
  roomName: localStorage.getItem(SELECTED_ROOM_NAME) || '',
  setRoomId: (roomId: string) => {
    localStorage.setItem(SELECTED_ROOM_ID, roomId);
    set({ roomId });
  },
  setRoomName: (roomName: string) => {
    localStorage.setItem(SELECTED_ROOM_NAME, roomName);
    set({ roomName });
  },
}));
