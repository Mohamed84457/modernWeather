
import axios from "axios";

export const GetCurrentWeatherDependonLatLog = (
  lat: number | null,
  lon: number | null,
  lang?:string
) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_CURRENT_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&lang=${lang}`,
  );

export const GetForecastWeather = (
  periodDays: number,
  lat?: number | null,
  log?: number | null,
  regein?: string | null,
  lang?:string
) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_FOREST_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${regein || `${lat},${log}`}&days=${periodDays}&lang=${lang}`,
  );
