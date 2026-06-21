import { create } from "zustand";

interface ISearch {
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<ISearch>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
}));
