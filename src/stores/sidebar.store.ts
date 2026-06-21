import { create } from "zustand";

interface ISideBar {
  status: boolean;
  setStatus: (status: boolean) => void;
  toggle: () => void;
}

export const useSidebarStore = create<ISideBar>((set) => ({
  status: false,

  setStatus: (value: boolean) => set({ status: value }),

  toggle: () =>
    set((state) => ({
      status: !state.status,
    })),
}));
