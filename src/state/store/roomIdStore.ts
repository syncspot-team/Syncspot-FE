import { create } from 'zustand';

const SELECTED_ROOM_ID = 'selectedRoomId';

interface IRoomIdState {
  roomId: string;
  setRoomId: (roomId: string) => void;
}

export const useRoomIdStore = create<IRoomIdState>((set) => ({
  roomId: localStorage.getItem(SELECTED_ROOM_ID) || '',
  setRoomId: (roomId: string) => {
    localStorage.setItem(SELECTED_ROOM_ID, roomId);
    set({ roomId });
  },
}));
