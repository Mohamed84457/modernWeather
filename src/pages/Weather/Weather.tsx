import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// action
import { GetCurrentWeatherDependonLatLog } from "../../api/requests/HomeRequst";
// component
import WeatherHeader from "../../components/weatherHeader";
// store
import { useLanguage } from "../../stores/lang.store";
export default function Weather() {
    const lang=useLanguage((state)=>state.lang)

  const [result, setResult] = useState(null);
  const [searchParams] = useSearchParams();
  //   get lat and lon of city
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  useEffect(() => {
    if (!lat || !lon) {
      return;
    }
    GetCurrentWeatherDependonLatLog(Number(lat), Number(lon),lang).then((res) => {
      setResult(res.data);
    });
  }, [lat, lon]);
  return (
    <div>
      <WeatherHeader current={result?.current} location={result?.location} />
    </div>
  );
}
