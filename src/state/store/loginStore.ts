import { create } from 'zustand';

interface LoginState {
  isLogin: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const ACCESS_TOKEN = 'accessToken';

export const useLoginStore = create<LoginState>((set) => ({
  isLogin: Boolean(localStorage.getItem(ACCESS_TOKEN)),
  login: (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    set({ isLogin: true });
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    set({ isLogin: false });
  },
}));
