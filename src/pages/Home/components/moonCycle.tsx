import { Moon, MoonStar, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useCurrentHomeData } from "../../../stores/CurrentHomeData.store";

export default function MoonCycle() {
  const homeDateForecast = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );

  if (!homeDateForecast) return null;

  const { moonrise, moonset, moon_phase, moon_illumination, is_moon_up } =
    homeDateForecast.forecast.forecastday[0].astro;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center gap-2">
        <Moon className="h-6 w-6 text-slate-200" />
        <h2 className="text-lg font-semibold text-white">Moon Cycle</h2>
      </div>

      <div className="grid  grid-cols-2 gap-4">
        {/* Moonrise */}
        <div className="rounded-2xl bg-indigo-500/10 border border-indigo-400/20 p-4">
          <ArrowUpCircle className="mb-2 h-6 w-6 text-indigo-300" />
          <p className="text-sm text-slate-400">Moonrise</p>
          <h3 className="font-bold text-slate-100">{moonrise}</h3>
        </div>

        {/* Moonset */}
        <div className="rounded-2xl bg-violet-500/10 border border-violet-400/20 p-4">
          <ArrowDownCircle className="mb-2 h-6 w-6 text-violet-300" />
          <p className="text-sm text-slate-400">Moonset</p>
          <h3 className="font-bold text-slate-100">{moonset}</h3>
        </div>

        {/* Phase */}
        <div className="rounded-2xl bg-sky-500/10 border border-sky-400/20 p-4">
          <MoonStar className="mb-2 h-6 w-6 text-sky-300" />
          <p className="text-sm text-slate-400">Phase</p>
          <h3 className="font-bold text-slate-100">{moon_phase}</h3>
        </div>

        {/* Illumination */}
        <div className="rounded-2xl bg-slate-500/10 border border-slate-300/20 p-4">
          <Moon className="mb-2 h-6 w-6 text-slate-300" />
          <p className="text-sm text-slate-400">Illumination</p>
          <h3 className="font-bold text-slate-100">{moon_illumination}%</h3>
        </div>
      </div>

      <div
        className={`mt-4 rounded-xl border p-3 text-center text-sm font-medium ${
          is_moon_up
            ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-200"
            : "border-slate-400/20 bg-slate-500/10 text-slate-300"
        }`}
      >
        {is_moon_up
          ? "🌙 Moon is currently visible"
          : "🌑 Moon is below horizon"}
      </div>
    </div>
  );
}
