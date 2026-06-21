import { useEffect, useMemo, useState } from "react";

// store
import { useUserLocation } from "../../stores/userLocation.store";
import { useLanguage } from "../../stores/lang.store";
// components
import HourlyForecast from "./components/HourlyForecast";
import DaysForecast from "./components/DaysForecast";
import TemperatureTrend from "./components/temperatureTrend";
import PrecipitationProbability from "./components/precipitationProbability";
import StatCard from "./components/starCard";

// actions
import { GetForecastWeather } from "../../api/requests/HomeRequst";

// types
import type { HomeResponse2 } from "../../types/HomeData";

export default function Forecast() {
    const lang=useLanguage((state)=>state.lang)

  const userLocation = useUserLocation((state) => state.location);
  const { lat, log } = userLocation;

  const [forecastData, setForecastData] =
    useState<HomeResponse2 | null>(null);

  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState<3 | 7 | 14>(3);

  const tabs = [
    { label: "3 Days", value: 3 },
    { label: "7 Days", value: 7 },
    { label: "14 Days", value: 14 },
  ] as const;

  // ----------------------------
  // FETCH DATA
  // ----------------------------
  useEffect(() => {
    if (!lat || !log) return;

    GetForecastWeather(days, lat, log,null,lang).then((res) => {
      setForecastData(res.data);
    });

    setSelectedDay(0);
  }, [days, lat, log]);

  // ----------------------------
  // SAFE DATA
  // ----------------------------
  const forecastDays = forecastData?.forecast?.forecastday ?? [];

  // ----------------------------
  // STATS (MEMOIZED)
  // ----------------------------
  const stats = useMemo(() => {
    if (!forecastDays.length) return null;

    const rainyDays = forecastDays.filter(
      (d) => d.day.daily_chance_of_rain > 50
    ).length;

    const warmest = Math.max(
      ...forecastDays.map((d) => d.day.maxtemp_c)
    );

    const coolest = Math.min(
      ...forecastDays.map((d) => d.day.mintemp_c)
    );

    return {
      rainyDays,
      warmest,
      coolest,
    };
  }, [forecastDays]);

  // ----------------------------
  // HANDLERS
  // ----------------------------
  const handleChangeForeCatsDay = (day: number) => {
    if (!forecastDays.length) return;

    setSelectedDay(
      day >= forecastDays.length ? 0 : day
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ----------------------------
  // LOADING STATE
  // ----------------------------
  if (!forecastData) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-20 rounded-3xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-4">
          <div className="h-24 rounded-2xl bg-slate-200" />
          <div className="h-24 rounded-2xl bg-slate-200" />
          <div className="h-24 rounded-2xl bg-slate-200" />
          <div className="h-24 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-72 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-gray-500 via-gray-400 to-gray-700
        animate-in fade-in slide-in-from-bottom-4 duration-500
        px-4 py-6
         rounded-xl
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Forecast Dashboard
        </h1>

        <p className="mt-1 text-slate-200">
          Explore hourly, daily and long-term weather trends
        </p>
      </div>

      {/* TABS (sticky feel) */}
      <div className="mb-6 flex items-center">
        <div className="sticky top-3 z-20 inline-flex rounded-2xl border border-white/20 bg-white/70 p-1 backdrop-blur-xl shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setDays(tab.value)}
              className={`
                relative px-5 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-300
                ${
                  days === tab.value
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-white/50"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
          <StatCard title="Forecast Days" value={days} />

          <StatCard
            title="Rainy Days"
            value={stats.rainyDays}
          />

          <StatCard
            title="Warmest"
            value={`${Math.round(stats.warmest)}°`}
          />

          <StatCard
            title="Coolest"
            value={`${Math.round(stats.coolest)}°`}
          />
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* HOURLY */}
        <div className="xl:col-span-7">
          <HourlyForecast
            Hours={
              forecastDays[selectedDay]?.hour ?? []
            }
          />
        </div>

        {/* TREND */}
        <div className="xl:col-span-5">
          <TemperatureTrend
            forecastdays={forecastDays}
            daysRange={days}
          />
        </div>

        {/* RAIN */}
        <div className="xl:col-span-12">
          <PrecipitationProbability
            forecastdays={forecastDays}
            daysRange={days}
          />
        </div>

        {/* DAYS */}
        <div className="xl:col-span-12">
          <DaysForecast
            daysRange={days}
            forecastdays={forecastDays}
            selectedDay={selectedDay}
            handleChangeForeCatsDay={
              handleChangeForeCatsDay
            }
          />
        </div>
      </div>
    </div>
  );
}