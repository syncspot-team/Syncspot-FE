import { create } from 'zustand';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const SELECTED_ROOM_ID = 'selectedRoomId';
const SELECTED_ROOM_NAME = 'selectedRoomName';

interface ILoginState {
  isLogin: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useLoginStore = create<ILoginState>((set) => ({
  isLogin: Boolean(localStorage.getItem(ACCESS_TOKEN)),
  login: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    set({ isLogin: true });
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(SELECTED_ROOM_ID);
    localStorage.removeItem(SELECTED_ROOM_NAME);
    set({ isLogin: false });
  },
}));
