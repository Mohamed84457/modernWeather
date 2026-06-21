import { Droplets, Sun, Wind, Eye } from "lucide-react";
// store
import { useDegreeUnit } from "../../../stores/degreeUnit.store";

function getUvLevel(uv: number) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

export const weatherFeatureConfig = {
  humidity: {
    label: "Humidity",
    icon: Droplets,
    iconColor: "text-cyan-500",
    unit: "%",
    getExtra: (data: any) => `${data.dewPoint ?? ""}° dew`,
  },

  uv: {
    label: "UV Index",
    icon: Sun,
    iconColor: "text-yellow-500",
    unit: "",
    getExtra: (data: any) => (data.uv > 7 ? "High risk" : "Normal"),
  },

  wind: {
    label: "Wind",
    icon: Wind,
    iconColor: "text-sky-500",
    unit: "km/h",
    getExtra: (data: any) => data.windDir,
  },

  visibility: {
    label: "Visibility",
    icon: Eye,
    iconColor: "text-gray-500",
    unit: "km",
    getExtra: (data: any) => getUvLevel(data),
  },
} as const;
interface IProps {
  type: keyof typeof weatherFeatureConfig;
  value: number;
  data: any;
}

export default function SmallWeatherCard({ type, value, data }: IProps) {
  const degreeUnit = useDegreeUnit((state) => state.degreeUnit);
  const config = weatherFeatureConfig[type];
  const Icon = config.icon;
  const unit = type === "wind" ? (data.unit ?? (degreeUnit === "c" ? "km/h" : "mph")) : config.unit;

  return (
    <div
      className="
        relative overflow-hidden
        p-4 rounded-2xl
        bg-gradient-to-br from-white/80 to-white/40
        backdrop-blur-xl
        border border-white/50
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-0.5
        transition-all duration-300
      "
    >
      {/* subtle glow background */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-sky-200 via-transparent to-indigo-200" />

      {/* TOP */}
      <div className="relative flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
          {config.label}
        </h2>

        {/* icon bubble */}
        <div className="p-2 rounded-full bg-white/60 shadow-inner">
          <Icon className={`${config.iconColor} w-4 h-4`} />
        </div>
      </div>

      {/* VALUE */}
      <div className="relative space-y-1">
        <p className="text-2xl font-semibold text-gray-900 tracking-tight">
          {value}
          <span className="text-sm font-medium text-gray-500 ml-1">
            {unit}
          </span>
        </p>

        <p className="text-xs text-gray-500">{config.getExtra(data)}</p>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
