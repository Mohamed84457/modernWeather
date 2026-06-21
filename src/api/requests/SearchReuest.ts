import axios from "axios";

export const GetSearchData = (q: string,lang?:string) =>
  axios.get(
    `${import.meta.env.VITE_DOMAIN}${import.meta.env.VITE_SEARCH_WEATHER}?key=${import.meta.env.VITE_API_KEY}&q=${q}&lang=${lang}`,
  );
