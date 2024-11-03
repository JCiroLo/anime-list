import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IndexedDB } from "@/stores";

type TSettings = {
  sidebar: {
    open: boolean;
  };
  toggleSidebarOpen: () => void;
};

const useSession = create(
  persist<TSettings>(
    (set) => ({
      sidebar: {
        open: false,
      },
      toggleSidebarOpen: () => set((state) => ({ ...state, sidebar: { ...state.sidebar, open: !state.sidebar.open } })),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => IndexedDB),
    }
  )
);

export default useSession;
