// types
import type { current } from "../../../types/HomeData";
import type { location } from "../../../types/HomeData";
// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";
import type { forecastday } from "../../../types/HomeData";

import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Radiation,
  SolarPanel,
  Compass,
} from "lucide-react";
import { CurrentWeatherCard } from "./currentWeatherCard";
import HourlyForecast from "../../Forecast/components/HourlyForecast";

interface Props {
  current: current;
  location: location;
  forecastDay: forecastday;
}

export default function WeatherDashboard({
  current,
  location,
  forecastDay,
}: Props) {
  // unit
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);
  if (!current || !location || !forecastDay) return null;
  // convert from c to f
  function celsiusToFahrenheit(celsius: number): number {
    return Number(((celsius * 9) / 5 + 32).toFixed(1));
  }
  return (
    <div className="space-y-6">
      {/* Hero Card */}

      <div
        className="
    relative overflow-hidden
    rounded-[40px]
    p-8 lg:p-10
    border border-white/10
    bg-gradient-to-br
    from-sky-500/30
    via-blue-700/20
    to-indigo-900/40
    backdrop-blur-3xl
    shadow-[0_20px_80px_rgba(14,165,233,0.25)]
"
      >
        <div className="absolute -top-32 -right-20 w-72 h-72 bg-sky-400/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.2),transparent_40%)]" />

        <div className="relative flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <p className="text-white/70">
              {location.name}, {location.country}
            </p>

            <h1 className="text-8xl font-black tracking-tight">
              {Math.round(degreeUnit === "c" ? current.temp_c : current.temp_f)}
              °
            </h1>

            <p className="text-2xl font-medium">{current.condition.text}</p>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
              <Thermometer size={16} />
              <span>
                Feels like{" "}
                {Math.round(
                  degreeUnit === "c"
                    ? current.feelslike_c
                    : current.feelslike_f,
                )}
                °
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={`https:${current.condition.icon}`}
              alt=""
              className="w-40 h-40"
            />

            <div className="text-center">
              <p className="text-lg">
                H:{" "}
                {degreeUnit === "c"
                  ? forecastDay?.day?.maxtemp_c
                  : celsiusToFahrenheit(forecastDay?.day.maxtemp_c)}
                °
              </p>

              <p className="text-lg">
                L:{" "}
                {degreeUnit === "c"
                  ? forecastDay?.day.mintemp_c
                  : celsiusToFahrenheit(forecastDay?.day.mintemp_c)}
                °
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Today's Highlights</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CurrentWeatherCard
            title="Humidity"
            value={`${current.humidity}%`}
            icon={<Droplets />}
          />

          <CurrentWeatherCard
            title="Wind"
            value={`${current.wind_kph} km/h`}
            icon={<Wind />}
          />

          <CurrentWeatherCard
            title="Pressure"
            value={`${current.pressure_mb}`}
            icon={<Gauge />}
          />

          <CurrentWeatherCard
            title="Visibility"
            value={`${current.vis_km} km`}
            icon={<Eye />}
          />

          <CurrentWeatherCard
            title="UV Index"
            value={current.uv}
            icon={<Sun />}
          />

          <CurrentWeatherCard
            title="Cloud Cover"
            value={`${current.cloud}%`}
            icon={<Cloud />}
          />

          <CurrentWeatherCard
            title="Rain"
            value={`${current.precip_mm} mm`}
            icon={<CloudRain />}
          />

          <CurrentWeatherCard
            title="Wind Dir"
            value={current.wind_dir}
            icon={<Compass />}
          />
        </div>
      </div>

      {/* Forecast Summary */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <HourlyForecast Hours={forecastDay.hour} />
        </div>
      </div>

      {/* Astronomy */}
      <div
        className="
rounded-3xl
bg-gradient-to-br
from-amber-500/10
to-orange-500/10
border border-amber-500/20
p-6
backdrop-blur-xl
 grid grid-cols-1 gap-3"
      >
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Sun</h3>

          <div className="flex items-center gap-3 mb-4">
            {/* <Sunrise className="text-amber-400" /> */}
            <span> 🌇Sunrise</span>
          </div>

          <div className="flex items-center gap-3">
            {/* <Sunset className="text-orange-400" /> */}
            <span>🌅Sunset</span>
          </div>
        </div>

        <div
          className="
rounded-3xl
bg-gradient-to-br
from-indigo-500/10
to-violet-500/10
border border-indigo-500/20
p-6
backdrop-blur-xl
"
        >
          <h3 className="text-xl font-bold mb-4">Moon</h3>
          <div className="space-y-3">
            <p>🌙 {forecastDay.astro.moon_phase}</p>
            <p>✨ {forecastDay.astro.moon_illumination}% illuminated</p>
            <p>⬆ {forecastDay.astro.moonrise}</p>
            <p>⬇ {forecastDay.astro.moonset}</p>
          </div>
        </div>
      </div>

      {/* Solar Radiation */}
      <div className="grid md:grid-cols-4 gap-4">
        <CurrentWeatherCard
          icon={<Radiation />}
          title="Short Radiation"
          value={`${current.short_rad ?? 0} W/m²`}
        />

        <CurrentWeatherCard
          icon={<Radiation />}
          title="Diffuse Radiation"
          value={`${current.diff_rad ?? 0} W/m²`}
        />

        <CurrentWeatherCard
          icon={<SolarPanel />}
          title="DNI"
          value={`${current.dni ?? 0}`}
        />

        <CurrentWeatherCard
          icon={<SolarPanel />}
          title="GTI"
          value={`${current.gti ?? 0}`}
        />
      </div>
    </div>
  );
}
