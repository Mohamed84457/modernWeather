// import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function CurrentWeatherCard({ title, value, icon }: WeatherCardProps) {
  return (
    <div
      className="
group
rounded-3xl
border border-white/10
bg-white/5
backdrop-blur-xl
p-5
hover:bg-white/10
hover:-translate-y-1
transition-all
duration-300
"
    >
      <div
        className="
w-12 h-12
rounded-2xl
bg-sky-500/15
flex items-center justify-center
text-sky-400
group-hover:scale-110
transition-transform
"
      >
        {icon}
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <span className="text-sm">{title}</span>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}
