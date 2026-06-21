// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

// types
import type { forecastday } from "../../../types/HomeData";

// icons
import {
  TrendingUp,
  Flame,
  Snowflake,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TemperatureTrendProps {
  forecastdays: forecastday[];
  daysRange: number;
}

export default function TemperatureTrend({
  forecastdays,
  daysRange,
}: TemperatureTrendProps) {
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);

  const trendData = forecastdays.slice(0, daysRange).map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    avg:
      degreeUnit === "c"
        ? day.day.avgtemp_c
        : day.day.avgtemp_f,
    min:
      degreeUnit === "c"
        ? day.day.mintemp_c
        : day.day.mintemp_f,
    max:
      degreeUnit === "c"
        ? day.day.maxtemp_c
        : day.day.maxtemp_f,
  }));

  const hottest = trendData.reduce((a, b) =>
    a.max > b.max ? a : b
  );

  const coolest = trendData.reduce((a, b) =>
    a.min < b.min ? a : b
  );

  const firstTemp = trendData[0]?.avg ?? 0;
  const lastTemp =
    trendData[trendData.length - 1]?.avg ?? 0;

  const difference = Math.round(lastTemp - firstTemp);

  const trendType =
    difference > 0
      ? "warming"
      : difference < 0
      ? "cooling"
      : "stable";

  return (
    <div className="rounded-3xl border border-white/30 bg-white/70 p-6 backdrop-blur-xl shadow-lg">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <TrendingUp className="size-5 text-orange-500" />
            Temperature Trend
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {daysRange}-day forecast overview
          </p>
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            trendType === "warming"
              ? "bg-orange-100 text-orange-700"
              : trendType === "cooling"
              ? "bg-sky-100 text-sky-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {trendType === "warming" && (
            <ArrowUpRight className="size-4" />
          )}

          {trendType === "cooling" && (
            <ArrowDownRight className="size-4" />
          )}

          {trendType === "stable"
            ? "Stable"
            : `${Math.abs(difference)}° ${trendType}`}
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-orange-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-orange-600">
            <Flame className="size-4" />
            <span className="text-xs font-medium">
              Hottest
            </span>
          </div>

          <p className="font-semibold text-slate-800">
            {hottest.date}
          </p>

          <p className="text-sm text-slate-500">
            {Math.round(hottest.max)}°
          </p>
        </div>

        <div className="rounded-2xl bg-sky-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-sky-600">
            <Snowflake className="size-4" />
            <span className="text-xs font-medium">
              Coolest
            </span>
          </div>

          <p className="font-semibold text-slate-800">
            {coolest.date}
          </p>

          <p className="text-sm text-slate-500">
            {Math.round(coolest.min)}°
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={trendData}>
          <defs>
            <linearGradient
              id="temperatureGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.15}
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            width={30}
          />

          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              const data = payload[0].payload;

              return (
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                  <p className="mb-2 font-semibold">
                    {label}
                  </p>

                  <div className="space-y-1 text-sm">
                    <p>
                      🔥 Max: {Math.round(data.max)}°
                    </p>

                    <p>
                      🌡 Avg: {Math.round(data.avg)}°
                    </p>

                    <p>
                      ❄️ Min: {Math.round(data.min)}°
                    </p>
                  </div>
                </div>
              );
            }}
          />

          <Line
            type="monotone"
            dataKey="max"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />

          <Line
            type="monotone"
            dataKey="min"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />

          <Line
            type="monotone"
            dataKey="avg"
            stroke="url(#temperatureGradient)"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            isAnimationActive
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}