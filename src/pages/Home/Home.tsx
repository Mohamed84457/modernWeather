import { useNavigate } from "react-router-dom";
// store
import { useCurrentHomeData } from "../../stores/CurrentHomeData.store";
import { useDegreeUnit } from "../../stores/degreeUnit.store";
// components
import WeatherCardHome from "./components/weatherCardHome";
import SmallWeatherCard from "./components/SmallWeatherCard";
import ForeCastOneDay from "./components/foreCastOneDay";
import SolarCycle from "./components/solarCycle";
// assets
import { formatDateTime } from "../../assets/dateTimeAssest";
// types
import { Unit } from "../../stores/degreeUnit.store";
import { MoonPhase } from "../../components/lunerSystem";

export default function Home() {
  const navigate = useNavigate();
  const homeData = useCurrentHomeData((state) => state.homeData);
  const forecastHomeData = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);
  const ifCelsius = degreeUnit === Unit.Celsius;

  if (!homeData||!forecastHomeData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-sm text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      
        min-h-screen
        px-4 md:px-8 py-6
        max-w-full
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-500">Today’s Weather</h1>
        <p className="text-sm text-gray-500">
          Live conditions based on your location
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: MAIN CARD */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <WeatherCardHome
              isDay={homeData?.current?.is_day}
              localTime={formatDateTime(homeData?.location?.localtime)}
              condition={{
                text: homeData.current.condition.text,
                icon: homeData.current.condition.icon ?? "",
                code: homeData.current.condition.code ?? 0,
              }}
              temp_c={
                ifCelsius ? homeData.current.temp_c : homeData.current.temp_f
              } //check f or c
              feelTemp={
                ifCelsius
                  ? homeData?.current?.feelslike_c
                  : homeData?.current?.feelslike_f
              }
            />
          </div>
        </div>

        {/* RIGHT: SECONDARY GRID */}
        <div className="grid grid-cols-2 gap-4 content-start">
          <SmallWeatherCard
            type="humidity"
            value={homeData?.current?.humidity}
            data={{
              dewPoint: ifCelsius
                ? homeData.current.dewpoint_c
                : homeData.current.dewpoint_f,
            }}
          />

          <SmallWeatherCard
            type="uv"
            value={homeData?.current?.uv}
            data={{ uv: homeData?.current?.uv }}
          />

          <SmallWeatherCard
            type="wind"
            value={
              ifCelsius
                ? homeData?.current?.wind_kph
                : homeData?.current?.wind_mph
            }
            data={{
              windDir: homeData.current.wind_dir,
              unit: ifCelsius ? "km/h" : "mph",
            }}
          />

          <SmallWeatherCard
            type="visibility"
            value={homeData?.current?.vis_km}
            data={{ visibility: homeData?.current?.vis_km }}
          />
        </div>
      </div>
      {/* one day forecast */}
      <div className="grid grid-cols-1">
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-md  space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="mb-4 text-lg font-semibold">24-Hour Forecast</h2>
            <h2
              className="mb-4 text-lg text-gray-500 cursor-pointer  transform active:scale-90 active:translate-y-1 transition-all duration-150  font-semibold"
              onClick={() => navigate("/Forecast")}
            >
              view full
            </h2>
          </div>
          <ForeCastOneDay />
        </div>
      </div>
      {/* soral and moon cycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-6">
        <SolarCycle />
        <MoonPhase
          illumination={
            forecastHomeData.forecast.forecastday[0].astro.moon_illumination
          }
          is_moon_up={forecastHomeData.forecast.forecastday[0].astro.is_moon_up}
          moon_phase={forecastHomeData.forecast.forecastday[0].astro.moon_phase}
          moonrise={forecastHomeData.forecast.forecastday[0].astro.moonrise}
          moonset={forecastHomeData.forecast.forecastday[0].astro.moonset}
        />
      </div>
    </div>
  );
}
