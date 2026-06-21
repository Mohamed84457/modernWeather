
import axios from "axios";

export const GetHistoryWeather = (
  date?: string,
  lat?: number | null,
  log?: number | null,
  lang?:string
) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_HISTORY_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${`${lat},${log}`}&dt=${date}&lang=${lang}`,
  );
