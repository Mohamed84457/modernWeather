import { useState } from "react";
import { Calendar, Search, History as HistoryIcon } from "lucide-react";

// store
import { useUserLocation } from "../../stores/userLocation.store";
import { useLanguage } from "../../stores/lang.store"; 
// action
import { GetHistoryWeather } from "../../api/requests/HistoryRequest";

// types
import type { HistoryResponse } from "../../types/HomeData";

// components
import HistoryWeatherDashboard from "./components/historyWeatherCard";

export default function Historical() {
  const lang = useLanguage((state) => state.lang);

  const [historyResult, setHistoryResult] = useState<HistoryResponse | null>(
    null,
  );

  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userLocation = useUserLocation((state) => state.location);

  const handleGetHistoryWeatherDate = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { lat, log } = userLocation;

      const res = await GetHistoryWeather(date, lat, log,lang);

      setHistoryResult(res.data);
    } catch (err) {
      setError("Failed to load weather history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 grid grid-cols-1">
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-gradient-to-br
          from-indigo-500/20
          via-blue-500/10
          to-sky-500/20
          backdrop-blur-2xl
          p-8
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_40%)]" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <HistoryIcon className="text-sky-400" />
            <h1 className="text-3xl font-bold">Historical Weather</h1>
          </div>

          <p className="text-white/60">
            Explore weather conditions from previous dates.
          </p>

          {/* Search Form */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />

              <input
                type="date"
                value={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-xl
                  outline-none
                  focus:border-sky-400
                "
              />
            </div>

            <button
              disabled={loading}
              onClick={handleGetHistoryWeatherDate}
              className="
                flex items-center justify-center gap-2
                px-6 py-3
                rounded-2xl
                bg-sky-500
                hover:bg-sky-600
                disabled:opacity-50
                transition
              "
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-14 w-14 rounded-full border-4 border-sky-500/30 border-t-sky-400 animate-spin" />
            <p className="text-white/60">Loading historical weather...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && historyResult && (
        <HistoryWeatherDashboard data={historyResult} />
      )}

      {/* Empty State */}
      {!loading && !historyResult && (
        <div
          className="
            rounded-3xl
            border border-dashed border-white/10
            bg-white/5
            backdrop-blur-xl
            py-20
            text-center
          "
        >
          <HistoryIcon size={50} className="mx-auto mb-4 text-white/40" />

          <h3 className="text-xl font-semibold mb-2">No Historical Data Yet</h3>

          <p className="text-white/60">
            Select a date above to view weather history.
          </p>
        </div>
      )}
    </div>
  );
}
