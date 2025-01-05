import { create } from 'zustand';

const ACCESS_TOKEN = 'accessToken';

interface ILoginState {
  isLogin: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useLoginStore = create<ILoginState>((set) => ({
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
