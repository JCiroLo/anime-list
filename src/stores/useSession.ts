import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TSession = {
  user: {
    nickname: string;
    avatar: string;
  };
  avatars: string[];
};

const useSession = create(
  persist<TSession>(
    (set) => ({
      user: {
        nickname: "",
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
