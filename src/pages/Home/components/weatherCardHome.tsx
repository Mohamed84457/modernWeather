
interface Iprops {
  isDay: boolean;
  localTime: string;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  temp_c: number;
  feelTemp: number;
 
}
export default function WeatherCardHome({
  isDay = true,
  localTime = "Oct 24, 08:42 AM",
  condition = {
    text: "Clear",
    icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    code: 1183,
  },
  temp_c = 20,
  feelTemp = 22,
  
}: Iprops) {
  const weatherStyles = {
    1000: "from-sky-400 via-blue-500 to-indigo-600", // clear
    1003: "from-sky-300 via-slate-400 to-slate-600", // partly cloudy
    1006: "from-slate-400 via-slate-500 to-slate-700", // cloudy
    1183: "from-cyan-500 via-blue-700 to-slate-900", // rain
  };

  return (
    <div
      className={`
  rounded-3xl p-6
  text-white
  shadow-2xl
  backdrop-blur-md
  bg-gradient-to-br
  ${weatherStyles[condition.code as keyof typeof weatherStyles] ?? "from-sky-400 via-blue-500 to-indigo-600"}
`}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-80">
            Good {isDay ? "Morning" : "Evening"}
          </p>

          <h2 className="mt-1 text-lg font-medium">{localTime}</h2>
        </div>

        <div className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
          <span className="text-sm capitalize">{condition.text}</span>
        </div>
      </div>

      {/* Center */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <h1 className="text-7xl font-bold tracking-tight">{temp_c}°</h1>

          <p className="mt-2 text-white/80">Feels like {feelTemp}°</p>
        </div>

        <div className="flex gap-1">
          <img
            src={condition.icon}
            alt={condition.text}
            className="h-28 w-28"
          />
          
        </div>
      </div>
    </div>
  );
}
