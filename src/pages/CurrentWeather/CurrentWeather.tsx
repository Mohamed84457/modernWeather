// components
import WeatherDashboard from "./components/fullyWeatherCard";
// strore
import { useCurrentHomeData } from "../../stores/CurrentHomeData.store";
export default function CurrentWeather() {
  // get data from home
  const HomeData = useCurrentHomeData((state) => state.homeData);
  const HomeDataForecast = useCurrentHomeData(
    (state) => state.homeforecastdata,
  );
  if (!HomeData || !HomeDataForecast)
    return (
      <div className="grid grid-cols-1">
        <h2 className="text-center text-2xl text-gray-500">
          access location first
        </h2>
      </div>
    );
  return (
    <div className="relative grid grid-cols-1">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* dashboard content */}
      <WeatherDashboard
        current={HomeDataForecast.current}
        location={HomeData.location}
        forecastDay={HomeDataForecast.forecast.forecastday[0]}
      />
    </div>
  );
}
