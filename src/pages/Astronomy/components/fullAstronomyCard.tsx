import { Sparkles } from "lucide-react";
import { SkySun } from "./sunSycle";
import { MoonPhase } from "../../../components/lunerSystem";
import Stargazing from "./Stargazing";
// store
import { useCurrentHomeData } from "../../../stores/CurrentHomeData.store";
export default function FullAstronomyCard({ location, astro }) {
  const forecastHomeData = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );
  if (!astro || !location) return null;
  return (
    <section className="relative overflow-hidden rounded-[2rem]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* Stars */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.12),transparent_40%)]" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-300" />

              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Astronomy
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Sky Conditions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {location.name}, {location.country}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <p className="text-xs text-slate-400">Local Time</p>
            <p className="font-medium text-white">
              {location.localtime.split(" ")[1]}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <SkySun
            currentTime={location.localtime}
            sunRise={astro.sunrise}
            sunSet={astro.sunset}
          />

          <MoonPhase
            illumination={astro.moon_illumination}
            is_moon_up={astro.is_moon_up}
            moon_phase={astro.moon_phase}
            moonrise={astro.moonrise}
            moonset={astro.moonset}
          />
        </div>
        <div>
          <Stargazing
            clouds={forecastHomeData.current.cloud}
            visability={forecastHomeData.current.vis_km}
          />
        </div>
      </div>
    </section>
  );
}
