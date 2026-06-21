// store
import { useCurrentHomeData } from "../../../stores/CurrentHomeData.store";
// assest
import HourlyForecast from "../../Forecast/components/HourlyForecast";

export default function ForeCastOneDay() {
  const homeforecastdata = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );

  if (!homeforecastdata) return null;
  const hours = homeforecastdata.forecast.forecastday[0].hour;
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      <HourlyForecast Hours={hours} />
    </div>
  );
}
