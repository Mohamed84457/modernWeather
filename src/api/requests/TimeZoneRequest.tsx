
import axios from "axios";

export const GetTimeZoneData = (lat?: number, lon?: number, q?: string,lang?:string) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_TIMEZONE_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${q || `${lat},${lon}`}&lang=${lang}`,
  );
