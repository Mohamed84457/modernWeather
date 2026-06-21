import { useNavigate } from "react-router-dom";
// components
import CardForecast from "../../../components/cardForecast";

// icons
import { Timer } from "lucide-react";

// utils
import { formatDate, formatTo12Hour, isNow } from "../../../assets/dateTimeAssest";

// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

// types
import type { forecastHour } from "../../../types/HomeData";

interface Iprops {
  Hours: forecastHour[];
}

export default function HourlyForecast({ Hours }: Iprops) {
  // navigate
  const navigate=useNavigate();
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);

  return (
    <section className="space-y-4 grid">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-sky-100">
          <Timer className="size-5 text-sky-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800" onClick={()=>navigate("/Forecast")} >
            Hourly Forecast
            <span className="ml-2 "> {formatDate(Hours[0].time)}</span>
          </h2>
          <p className="text-sm text-slate-200">
            Weather conditions throughout the day
          </p>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="flex gap-4 pb-2 min-w-max">
          {Hours.map((hour) => (
            <CardForecast
              key={hour.time}
              humedity={hour.humidity}
              icon={hour.condition.icon}
              raichance_of_rain={hour.chance_of_rain}
              raichance_of_snow={hour.chance_of_snow}
              temp={degreeUnit === "c" ? hour.temp_c : hour.temp_f}
              time={formatTo12Hour(hour.time)}
              will_it_rain={hour.will_it_rain}
              will_it_snow={hour.will_it_snow}
              isNow={isNow(hour.time)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
