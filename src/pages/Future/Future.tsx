import { Calendar, Search } from "lucide-react";
import { useState } from "react";

import { useUserLocation } from "../../stores/userLocation.store";
import { GetFutureWeather } from "../../api/requests/FutureRequest";

import ForecastDayCard from "./components/forecastDay";
import FullAstronomyCard from "../Astronomy/components/fullAstronomyCard";
import LocationCard from "./components/futureHeader";

import type { HomeResponse2 } from "../../types/HomeData";
import { useLanguage } from "../../stores/lang.store";
export default function Future() {
    const lang=useLanguage((state)=>state.lang)

  const userLocation = useUserLocation((state) => state.location);
  const { lat, log } = userLocation;

  const [futureDate, setFutureDate] = useState("");
  const [result, setResult] = useState<HomeResponse2 | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClickConfirm = () => {
    if (!futureDate) return;

    const today = new Date();
    const selectedDate = new Date(futureDate);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const diffMs = selectedDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 14) return;

    setLoading(true);

    GetFutureWeather(futureDate, lat, log,lang)
      .then((res) => {
        setResult(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Future Weather Forecast
          </h1>

          <p className="mt-2 text-slate-400">
            Check weather conditions 14+ days in advance
          </p>
        </div>

        {/* Search Card */}
        <div className="mx-auto mb-10 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="date"
                value={futureDate}
                onChange={(e) => setFutureDate(e.target.value)}
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleClickConfirm}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 font-medium text-white transition-all hover:bg-cyan-400 active:scale-95"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          <p className="mt-3 text-center text-sm text-slate-400">
            Select a date at least 14 days in the future
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-5">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-400" />

              <p className="text-slate-300">
                Loading future weather...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
              <Calendar
                size={50}
                className="mx-auto mb-4 text-slate-500"
              />

              <h3 className="text-xl font-semibold text-white">
                No Forecast Selected
              </h3>

              <p className="mt-2 text-slate-400">
                Choose a date and explore future weather conditions.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && result && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Location */}
            <LocationCard location={result.location} />

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ForecastDayCard
                forecast={result.forecast.forecastday[0]}
              />

              <FullAstronomyCard
                astro={result.forecast.forecastday[0].astro}
                location={result.location}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}