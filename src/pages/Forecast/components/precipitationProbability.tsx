// icons
import {
  CloudRain,
  Droplets,
} from "lucide-react";

// types
import type { forecastday } from "../../../types/HomeData";

interface Iprops {
  daysRange: number;
  forecastdays: forecastday[];
}

export default function PrecipitationProbability({
  daysRange,
  forecastdays,
}: Iprops) {
  const highestRain = Math.max(
    ...forecastdays.map(
      (day) => day.day.daily_chance_of_rain
    )
  );

  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl shadow-lg">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 p-3 shadow-md">
          <CloudRain className="size-6 text-white" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Rain Probability
          </h2>

          <p className="text-sm text-slate-500">
            {daysRange}-day precipitation outlook
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {forecastdays.slice(0, daysRange).map((day) => {
          const rainChance =
            day.day.daily_chance_of_rain;

          const isHighest =
            rainChance === highestRain &&
            highestRain > 0;

          return (
            <div
              key={day.date}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                ${
                  isHighest
                    ? "border-sky-300 bg-sky-50"
                    : "border-slate-100 bg-slate-50/80"
                }
              `}
            >
              {/* Highlight Badge */}
              {isHighest && (
                <span className="absolute right-2 top-2 rounded-full bg-sky-500 px-2 py-1 text-[10px] font-medium text-white">
                  Highest
                </span>
              )}

              {/* Day */}
              <p className="text-xs font-medium text-slate-500">
                {new Date(day.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                  }
                )}
              </p>

              {/* Percentage */}
              <div className="mt-3 flex items-center gap-2">
                <Droplets className="size-4 text-sky-500" />

                <span className="text-2xl font-bold text-slate-800">
                  {rainChance}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-700"
                    style={{
                      width: `${rainChance}%`,
                    }}
                  />
                </div>
              </div>

              {/* Status */}
              <p className="mt-3 text-xs font-medium text-slate-500">
                {rainChance >= 70
                  ? "High chance"
                  : rainChance >= 40
                  ? "Moderate chance"
                  : rainChance > 0
                  ? "Low chance"
                  : "No rain expected"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}