import { create } from "zustand";

interface Ilang {
  lang: string;
  setLang: (lang: string) => void;
}
export const useLanguage = create<Ilang>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
}));
