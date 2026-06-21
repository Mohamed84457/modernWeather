import { create } from "zustand";
import type { HomeResponse } from "../types/HomeData";
import type { HomeResponse2 } from "../types/HomeData";

interface IHomeData {
  homeData: HomeResponse | null;
  homeforecastdata: HomeResponse2 | null;
  setHomeData: (homeData: HomeResponse | null) => void;
  setHomeForecastData: (homeforecastdata: HomeResponse2 | null) => void;
}
export const useCurrentHomeData = create<IHomeData>((set) => ({
  homeData: null,
  homeforecastdata: null,
  setHomeData: (homeData: HomeResponse | null) => set({ homeData }),
  setHomeForecastData: (homeforecastdata: HomeResponse2 | null) => set({ homeforecastdata }),
}));
