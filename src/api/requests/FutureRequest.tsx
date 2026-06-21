
import axios from "axios";

export const GetFutureWeather = (
  date?: string,
  lat?: number | null,
  log?: number | null,
  lang?:string
) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_FUTURE_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${`${lat},${log}`}&dt=${date}&lang=${lang}`,
  );
