// components
import { useEffect, useState } from "react";
// store
import { useUserLocation } from "../../stores/userLocation.store";
// components
import FullAstronomyCard from "./components/fullAstronomyCard";
// actions
import { GetAstronomyWeather } from "../../api/requests/AstronomyRequest";
// type
import type { satronomy } from "../../types/astronomyData";

// strore
import { useLanguage } from "../../stores/lang.store";
export default function Astronomy() {
  const lang = useLanguage((state) => state.lang);

  const userLocation = useUserLocation((state) => state.location);
  const { lat, log } = userLocation;

  const [result, setResult] = useState<satronomy | null>(null);

  useEffect(() => {
    GetAstronomyWeather(lat, log, lang).then((res) => {
      setResult(res.data);
    });
  }, [lat, log]);

  if (!result) return null;

  const astro = result.astronomy.astro;
  const location = result.location;

  return (
    <>
      <FullAstronomyCard astro={astro} location={location} />
    </>
  );
}
