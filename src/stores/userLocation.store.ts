import { create } from "zustand";
interface IUserLocation {
  location: {
    lat: number | null;
    log: number | null;
  };
  setLocation: (lat: number, log: number) => void;
}
export const useUserLocation = create<IUserLocation>((set) => ({
  location: { lat: null, log: null },
  setLocation: (lat, log) =>
    set({
      location: { lat, log },
    }),
}));
