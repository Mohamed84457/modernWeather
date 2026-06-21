import { Sunrise, Sunset, Sun } from "lucide-react";
import { useCurrentHomeData } from "../../../stores/CurrentHomeData.store";

export default function SolarCycle() {
  const homeDateForecast = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );

  if (!homeDateForecast) return null;

  const { sunrise, sunset, is_sun_up } =
    homeDateForecast.forecast.forecastday[0].astro;

  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${is_sun_up ? "from-sky-400 via-blue-500 to-indigo-600" : "bg-gray-600"} p-6 shadow-md mt-6`}
    >
      <h2 className="mb-5 text-lg font-semibold text-gray-800 flex gap-1">
        <Sun className="text-yellow-500" /> Sun Cycle ({is_sun_up ? "Day" : "Night"})
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise */}
        <div
          className="
            flex flex-col items-center
            rounded-2xl
            bg-gradient-to-b from-yellow-50 to-yellow-100
            p-4
          "
        >
          <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
            <Sunrise className="h-6 w-6 text-yellow-500" />
          </div>

          <p className="text-sm text-gray-500">Sunrise</p>

          <h3 className="mt-1 text-lg font-bold text-gray-900">{sunrise}</h3>
        </div>

        {/* Sunset */}
        <div
          className="
            flex flex-col items-center
            rounded-2xl
            bg-gradient-to-b from-orange-50 to-orange-100
            p-4
          "
        >
          <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
            <Sunset className="h-6 w-6 text-orange-600" />
          </div>

          <p className="text-sm text-gray-500">Sunset</p>

          <h3 className="mt-1 text-lg font-bold text-gray-900">{sunset}</h3>
        </div>
      </div>
    </div>
  );
}
