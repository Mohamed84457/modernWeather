import {
  CalendarDays,
  WavesHorizontal,
  Thermometer,
} from "lucide-react";

// types
import type { forecastday } from "../../../types/HomeData";

// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

// utils
import { isToday } from "../../../assets/dateTimeAssest";

interface Iprops {
  daysRange: number;
  forecastdays: forecastday[];
  selectedDay:number,
  handleChangeForeCatsDay: (day: number) => void;
}

export default function DaysForecast({
  daysRange,
  forecastdays,
  selectedDay,
  handleChangeForeCatsDay,
}: Iprops) {
  const degreeUnit = useDegreeUnit((s) => s.degreeUnit);

  if (!daysRange || !forecastdays?.length) return null;

  return (
    <section className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 p-3 shadow-lg">
          <CalendarDays className="size-6 text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {daysRange}-Day Forecast
          </h2>

          <p className="text-sm text-slate-500">
            Weather outlook for upcoming days
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {forecastdays.map((day, index) => {
          const isActive = index === selectedDay;

          const maxTemp =
            degreeUnit === "c"
              ? day.day.maxtemp_c
              : day.day.maxtemp_f;

          const minTemp =
            degreeUnit === "c"
              ? day.day.mintemp_c
              : day.day.mintemp_f;

          const avgTemp =
            degreeUnit === "c"
              ? day.day.avgtemp_c
              : day.day.avgtemp_f;

          const tempRange = Math.max(1, maxTemp - minTemp);

          const fillPercent =
            ((avgTemp - minTemp) / tempRange) * 100;

          return (
            <div
              key={day.date}
              onClick={() => handleChangeForeCatsDay(index)}
              className={`
                group relative cursor-pointer overflow-hidden
                rounded-3xl border backdrop-blur-xl p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl

                ${
                  isActive
                    ? "border-sky-300 bg-white/80"
                    : "border-white/20 bg-white/60"
                }
              `}
            >
              {/* ACTIVE GLOW */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10" />
              )}

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-sky-500/5 via-cyan-500/5 to-blue-500/5" />

              <div className="relative flex items-center justify-between gap-4">
                {/* DAY */}
                <div className="min-w-[90px]">
                  <h3 className="font-semibold text-slate-900">
                    {isToday(day.date)
                      ? "Today"
                      : new Date(day.date).toLocaleDateString(
                          "en-US",
                          { weekday: "short" }
                        )}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {new Date(day.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* WEATHER */}
                <div className="flex flex-1 items-center gap-3">
                  <div className="rounded-2xl bg-sky-100 p-2">
                    <img
                      src={day.day.condition.icon}
                      className="size-12"
                      alt={day.day.condition.text}
                    />
                  </div>

                  <div className="hidden sm:block">
                    <p className="font-medium text-slate-800">
                      {day.day.condition.text}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <WavesHorizontal className="size-3.5" />
                      <span>
                        {day.day.avghumidity}% humidity
                      </span>
                    </div>
                  </div>
                </div>

                {/* TEMPERATURE RANGE BAR */}
                <div className="hidden lg:flex flex-col min-w-[160px]">
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                    <span>{Math.round(minTemp)}°</span>
                    <span>{Math.round(maxTemp)}°</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 transition-all duration-500"
                      style={{
                        width: `${fillPercent}%`,
                      }}
                    />
                  </div>
                </div>

                {/* AVG TEMP */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Thermometer className="size-4 text-orange-500" />

                    <span className="text-2xl font-bold text-slate-900">
                      {Math.round(avgTemp)}°
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Avg temp
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}