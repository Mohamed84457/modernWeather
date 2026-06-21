import { Wind, Droplets, Eye, Sun } from "lucide-react";
import type { forecastHour } from "../../../types/HomeData";
import CardForecast from "../../../components/cardForecast";
import { formatTo12Hour, isNow } from "../../../assets/dateTimeAssest";
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

type ForecastDay = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  hour: forecastHour[];
};

interface Props {
  forecast: ForecastDay;
}

export default function ForecastDayCard({ forecast }: Props) {
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);
  const { day, date } = forecast;

  return (
    <div className=" grid rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Forecast</p>
          <h3 className="text-xl font-bold">
            {new Date(date).toLocaleDateString()}
          </h3>
        </div>

        <img
          src={`https:${day.condition.icon}`}
          alt={day.condition.text}
          className="w-16 h-16"
        />
      </div>

      {/* Condition */}
      <div className="mt-2">
        <p className="text-lg font-medium">{day.condition.text}</p>
      </div>

      {/* Temperature */}
      <div className="mt-4">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold">
            {Math.round(degreeUnit === "c" ? day.avgtemp_c : day.avgtemp_f)}°
          </span>
          <span className="text-slate-400 mb-1">Average</span>
        </div>

        <div className="mt-2 flex gap-4 text-sm">
          <span>
            ⬆️ {degreeUnit === "c" ? day.maxtemp_c : day.maxtemp_f}°
            {degreeUnit.toUpperCase()}
          </span>
          <span>
            ⬇️ {degreeUnit === "c" ? day.mintemp_c : day.mintemp_f}°
            {degreeUnit.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Wind size={16} />
            Wind
          </div>
          <p className="mt-1 text-lg font-semibold">{day.maxwind_kph} km/h</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Droplets size={16} />
            Humidity
          </div>
          <p className="mt-1 text-lg font-semibold">{day.avghumidity}%</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Eye size={16} />
            Visibility
          </div>
          <p className="mt-1 text-lg font-semibold">{day.avgvis_km} km</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Sun size={16} />
            UV Index
          </div>
          <p className="mt-1 text-lg font-semibold">{day.uv}</p>
        </div>
      </div>

      {/* Rain */}
      <div className="mt-4 rounded-2xl bg-white/5 p-3">
        <p className="text-slate-400 text-sm">Precipitation</p>
        <p className="text-lg font-semibold">{day.totalprecip_mm} mm</p>
      </div>

      {/* Forecast Cards */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent mt-3">
        <div className="flex gap-4 pb-2 min-w-max">
          {forecast.hour.map((hour) => (
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
    </div>
  );
}
