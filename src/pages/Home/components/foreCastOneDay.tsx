// components
import CardForecast from "../../../components/cardForecast";
// store
import { useCurrentHomeData } from "../../../stores/CurrentHomeData.store";
import { useDegreeUnit } from "../../../stores/degreeUnit.store";
// assest
import {
  formatTo12Hour,
  formatTo24Hour,
  isNow,
} from "../../../assets/dateTimeAssest";
import HourlyForecast from "../../Forecast/components/HourlyForecast";

export default function ForeCastOneDay() {
  const homeforecastdata = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );
  // unit
  const unitDegree = useDegreeUnit((state) => state.degreeUnit) || "c";

  if (!homeforecastdata) return null;
  const hours = homeforecastdata.forecast.forecastday[0].hour;
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      <HourlyForecast Hours={hours} />
    </div>
  );
}
