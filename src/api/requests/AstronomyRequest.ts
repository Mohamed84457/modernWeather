import axios from "axios";

export const GetAstronomyWeather = (
  lat?: number | null,
  log?: number | null,
  lang?: string,
) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_ASTRONOMY_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${`${lat},${log}`}&lang=${lang}`,
  );
