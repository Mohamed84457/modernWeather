import { useDegreeUnit } from "../stores/degreeUnit.store";
import { MapPin, Droplets, Wind, Eye, Sun } from "lucide-react";

interface Props {
  current: any;
  location: any;
}

export default function WeatherHeader({ current, location }: Props) {
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);
  if (!location || !current) return null;

  // const { location, current } = data;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-sky-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl">
      {/* TOP: location */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={16} />
            <span className="text-sm">
              {location.region}, {location.country}
            </span>
          </div>

          <h1 className="text-2xl font-bold mt-1">{location.name}</h1>

          <p className="text-sm text-slate-400">{location.localtime}</p>
        </div>

        {/* TEMPERATURE */}
        <div className="text-right">
          <h2 className="text-5xl font-bold">
            {degreeUnit === "c" ? current.temp_c : current?.temp_f}°
          </h2>
          <p className="text-slate-300">Feels like {current.feelslike_c}°</p>
        </div>
      </div>

      {/* CONDITION */}
      <div className="flex items-center gap-3 mt-6">
        <img src={current.condition.icon} alt="weather" className="w-12 h-12" />
        <span className="text-lg font-medium">{current.condition.text}</span>
      </div>

      {/* GRID INFO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {/* Humidity */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Droplets size={16} />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-lg font-semibold">{current.humidity}%</p>
        </div>

        {/* Wind */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Wind size={16} />
            <span className="text-sm">Wind</span>
          </div>
          <p className="text-lg font-semibold">{current.wind_kph} km/h</p>
        </div>

        {/* Visibility */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Eye size={16} />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-lg font-semibold">{current.vis_km} km</p>
        </div>

        {/* UV */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Sun size={16} />
            <span className="text-sm">UV Index</span>
          </div>
          <p className="text-lg font-semibold">{current.uv}</p>
        </div>
      </div>
    </div>
  );
}
