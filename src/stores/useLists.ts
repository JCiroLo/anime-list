import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { TList, TListSlug } from "@/types/List";
import type { TAnime } from "@/types/Anime";

type TLists = {
  lists: Partial<Record<TListSlug, TList>>;
  addList: (list: TList) => void;
  updateList: (newList: TList, oldList: TList) => void;
  removeList: (slug: TListSlug) => void;
  addAnimeToList: (slug: TListSlug, anime: TAnime) => void;
  removeAnimeFromList: (slug: TListSlug, anime: TAnime) => void;
};

const useLists = create(
  persist<TLists>(
    (set, get) => ({
      lists: {
        "watched-list": {
          animes: [],
          name: "Watched",
          slug: "watched-list",
          description: "My watched anime",
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          isCustom: false,
        },
        watchlist: {
          animes: [],
          name: "Watchlist",
          slug: "watchlist",
          description: "My anime watchlist",
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          isCustom: false,
        },
        favorites: {
          animes: [],
          name: "Favorites",
          slug: "favorites",
          description: "My favorite anime",
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          isCustom: false,
        },
      },

      // List actions
      addList(list: TList) {
        const { lists } = get();

        if (lists[list.slug]) throw new Error("List already exists");

        return set((state) => ({
          ...state,
          lists: { ...state.lists, [list.slug]: { ...list, createdAt: new Date().getTime(), updatedAt: new Date().getTime() } },
        }));
      },
      updateList(newList: TList, oldList: TList) {
        const { lists } = get();

        if (!lists[oldList.slug]) throw new Error("List does not exist");

        get().removeList(oldList.slug);

        return set((state) => ({
          ...state,
          lists: { ...state.lists, [newList.slug]: { ...newList, updatedAt: new Date().getTime() } },
        }));
      },
      removeList(slug: TListSlug) {
        const { lists } = get();

        if (!lists[slug]) throw new Error("List does not exist");

        const { [slug]: _, ...rest } = lists;

        return set((state) => ({ ...state, lists: rest }));
      },

      // List anime actions
      addAnimeToList(slug: TListSlug, anime: TAnime) {
        const { lists } = get();

        if (!lists[slug]) throw new Error("List does not exist");

        return set((state) => ({
          ...state,
          lists: {
            ...state.lists,
            [slug]: {
              ...state.lists[slug],
              animes: [...state.lists[slug]!.animes, { anime, watchedAt: new Date().getTime() }],
            },
          },
        }));
      },
      removeAnimeFromList(slug: TListSlug, anime: TAnime) {
        const { lists } = get();

        if (!lists[slug]) throw new Error("List does not exist");

        return set((state) => ({
          ...state,
          lists: {
            ...state.lists,
            [slug]: {
              ...state.lists[slug],
              animes: state.lists[slug]!.animes.filter((a) => a.anime.id !== anime.id),
            },
          },
        }));
      },
    }),
    {
      name: "anime-lists",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLists;
