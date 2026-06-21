import { CloudRainWind, Snowflake, WavesHorizontal } from "lucide-react";

interface IProps {
  time: string;
  icon: string;
  temp: number;
  will_it_rain: number;
  will_it_snow: number;
  raichance_of_rain: number;
  raichance_of_snow: number;
  humedity: number;
  isNow: boolean;
}

export default function CardForecast({
  time = "12:00",
  icon = "",
  temp = 20,
  will_it_snow = 0,
  will_it_rain = 0,
  raichance_of_rain = 0,
  raichance_of_snow = 0,
  humedity = 0,
  isNow = false,
}: IProps) {
  return (
    <div
      className={`
        min-w-[120px]
        p-4
        rounded-2xl
        backdrop-blur-md
        shadow-sm
        hover:shadow-lg
         hover:bg-gray-400 
        hover:-translate-y-1
        transition-all duration-300
${isNow ? "bg-cyan-600" : ""}
  `}
    >
      {/* Time */}
      <p className="text-sm font-medium text-gray-900 text-center">{time}</p>

      {/* Weather Icon */}
      <div className="flex justify-center my-3">
        <img src={icon} alt="weather" className="w-14 h-14 object-contain" />
      </div>

      {/* Temperature */}
      <h2 className="text-center text-2xl font-bold text-gray-900">{temp}°</h2>

      {/* rain & snow  */}
      <div className="mt-3 flex items-center justify-center gap-1 text-gray-900">
        {will_it_snow ? (
          <>
            <Snowflake className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">{raichance_of_snow}%</span>
          </>
        ) : will_it_rain ? (
          <>
            <CloudRainWind className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">{raichance_of_rain}%</span>
          </>
        ) : (
          <>
            <WavesHorizontal className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">{humedity}%</span>
          </>
        )}
      </div>
    </div>
  );
}
