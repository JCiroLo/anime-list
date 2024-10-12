import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TSession = {
  user: {
    nickname: string;
    avatar: string;
  };
  avatars: string[];
  updateNickname: (nickname: string) => void;
  updateAvatar: (avatar: string) => void;
  addAvatar: (avatar: string) => void;
  removeAvatar: (avatar: string) => void;
};

const useSession = create(
  persist<TSession>(
    (set) => ({
      user: {
        nickname: "Hikarimer",
        avatar: "",
      },
      avatars: [],
      updateNickname: (nickname: string) => set((state) => ({ ...state, user: { ...state.user, nickname } })),
      updateAvatar: (avatar: string) => set((state) => ({ ...state, user: { ...state.user, avatar } })),
      addAvatar: (avatar: string) => set((state) => ({ ...state, avatars: [...state.avatars, avatar] })),
      removeAvatar: (avatar: string) => set((state) => ({ ...state, avatars: state.avatars.filter((a) => a !== avatar) })),
    }),
    {
      name: "session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSession;
