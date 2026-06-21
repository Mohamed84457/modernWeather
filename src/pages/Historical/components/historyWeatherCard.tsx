import {
  CloudRain,
  CloudSnow,
  Droplets,
  Eye,
  Moon,
  Sunrise,
  Sunset,
  Sun,
  Wind,
} from "lucide-react";

// types
import type { HistoryResponse } from "../../../types/HomeData";

// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

interface Props {
  data: HistoryResponse;
}

export default function HistoryWeatherDashboard({ data }: Props) {
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);

  if (!data) return null;

  const { location, forecast } = data;
  const day = forecast.forecastday[0];

  const convertTemp = (c: number, f: number) =>
    degreeUnit === "c" ? Math.round(c) : Math.round(f);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className="
          relative overflow-hidden
          rounded-[40px]
          border border-white/10
          bg-gradient-to-br
          from-sky-500/20
          via-blue-600/20
          to-indigo-700/20
          backdrop-blur-3xl
          p-8 lg:p-10
        "
      >
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/60 text-lg">
              {location.name}, {location.country}
            </p>

            <h1 className="mt-3 text-7xl md:text-8xl font-black tracking-tight">
              {convertTemp(day.day.avgtemp_c, day.day.avgtemp_f)}°
            </h1>

            <p className="text-2xl text-white/80 mt-2">
              {day.day.condition.text}
            </p>

            <div className="mt-5 flex gap-4">
              <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                <span className="text-white/60">High</span>
                <p className="font-semibold">
                  {convertTemp(day.day.maxtemp_c, day.day.maxtemp_f)}°
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                <span className="text-white/60">Low</span>
                <p className="font-semibold">
                  {convertTemp(day.day.mintemp_c, day.day.mintemp_f)}°
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="mx-auto h-40 w-40"
            />

            <p className="text-white/60 mt-2">{day.day.condition.text}</p>
          </div>
        </div>
      </div>

      {/* Today's Highlights */}
      <section>
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
          <div className="h-8 w-1.5 rounded-full bg-sky-400" />
          Today's Highlights
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Humidity"
            value={`${day.day.avghumidity}%`}
            icon={<Droplets />}
          />

          <InfoCard
            title="Rain Chance"
            value={`${day.day.daily_chance_of_rain}%`}
            icon={<CloudRain />}
          />

          <InfoCard
            title="Snow Chance"
            value={`${day.day.daily_chance_of_snow}%`}
            icon={<CloudSnow />}
          />

          <InfoCard title="UV Index" value={day.day.uv} icon={<Sun />} />

          <InfoCard
            title="Visibility"
            value={`${day.day.avgvis_km} km`}
            icon={<Eye />}
          />

          <InfoCard
            title="Wind Speed"
            value={`${day.day.maxwind_kph} km/h`}
            icon={<Wind />}
          />

          <InfoCard
            title="Rainfall"
            value={`${day.day.totalprecip_mm} mm`}
            icon={<CloudRain />}
          />

          <InfoCard
            title="Snow"
            value={`${day.day.totalsnow_cm} cm`}
            icon={<CloudSnow />}
          />
        </div>
      </section>

      {/* Hourly Forecast */}
      <section>
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
          <div className="h-8 w-1.5 rounded-full bg-sky-400" />
          Hourly Forecast
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {day.hour.map((hour) => (
            <div
              key={hour.time}
              className="
                min-w-[140px]
                rounded-3xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                p-4
                text-center
                hover:bg-white/10
                transition-all
              "
            >
              <p className="text-sm text-white/60">{hour.time.split(" ")[1]}</p>

              <img
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                className="mx-auto my-2 h-12 w-12"
              />

              <p className="text-xl font-bold">
                {degreeUnit === "c"
                  ? Math.round(hour.temp_c)
                  : Math.round((hour.temp_c * 9) / 5 + 32)}
                °
              </p>

              <div className="mt-2 flex items-center justify-center gap-1 text-sky-300 text-sm">
                <Droplets size={14} />
                {hour.chance_of_rain}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Astronomy */}
      <section>
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
          <div className="h-8 w-1.5 rounded-full bg-sky-400" />
          Astronomy
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Sun */}
          <div
            className="
              rounded-3xl
              border border-amber-500/20
              bg-gradient-to-br
              from-amber-500/10
              to-orange-500/10
              p-6
              backdrop-blur-xl
            "
          >
            <h3 className="mb-5 text-xl font-bold">Sun Information</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sunrise className="text-amber-400" />
                <span>{day.astro.sunrise}</span>
              </div>

              <div className="flex items-center gap-3">
                <Sunset className="text-orange-400" />
                <span>{day.astro.sunset}</span>
              </div>
            </div>
          </div>

          {/* Moon */}
          <div
            className="
              rounded-3xl
              border border-indigo-500/20
              bg-gradient-to-br
              from-indigo-500/10
              to-violet-500/10
              p-6
              backdrop-blur-xl
            "
          >
            <h3 className="mb-5 text-xl font-bold">Moon Information</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Moon className="text-indigo-300" />
                <span>{day.astro.moon_phase}</span>
              </div>

              <p>Illumination: {day.astro.moon_illumination}%</p>

              <p>Moonrise: {day.astro.moonrise}</p>

              <p>Moonset: {day.astro.moonset}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section
        className="
          rounded-3xl
          border border-sky-500/20
          bg-gradient-to-r
          from-sky-500/10
          to-indigo-500/10
          p-6
          backdrop-blur-xl
        "
      >
        <h3 className="mb-3 text-xl font-bold">Daily Forecast Summary</h3>

        <p className="text-white/70 leading-relaxed">
          Average temperature is{" "}
          {convertTemp(day.day.avgtemp_c, day.day.avgtemp_f)}° with a{" "}
          {day.day.daily_chance_of_rain}% chance of rain, humidity around{" "}
          {day.day.avghumidity}%, UV index of {day.day.uv}, and maximum wind
          speed reaching {day.day.maxwind_kph} km/h.
        </p>
      </section>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div
      className="
        group
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-5
        hover:bg-white/10
        transition-all
      "
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-400">
        {icon}
      </div>

      <p className="text-sm text-white/60">{title}</p>

      <h3 className="mt-1 text-2xl font-bold">{value}</h3>
    </div>
  );
}
