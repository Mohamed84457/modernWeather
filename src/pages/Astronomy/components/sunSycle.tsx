import { Sunrise, Sunset } from "lucide-react";

interface SkySunProps {
  currentTime: string; // "2026-06-21 14:30"
  sunRise: string; // "05:58 AM"
  sunSet: string; // "08:03 PM"
}

function parseSunTime(time: string, currentDate: Date) {
  const [clock, period] = time.split(" ");

  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes,
  );
}

export function SkySun({
  currentTime ="2026-06-21 06:45",
  sunRise,
  sunSet,
}: SkySunProps) {
  const now = new Date(currentTime.replace(" ", "T"));

  const sunriseDate = parseSunTime(sunRise, now);
  const sunsetDate = parseSunTime(sunSet, now);

  const isSunUp = now >= sunriseDate && now <= sunsetDate;

  const progress = isSunUp
    ? (now.getTime() - sunriseDate.getTime()) /
      (sunsetDate.getTime() - sunriseDate.getTime())
    : now < sunriseDate
      ? 0
      : 1;

  const p = Math.max(0, Math.min(1, progress));

  // Horizontal movement
  const left = p * 100;

  // Natural solar arc
  const top = 80 - Math.sin(p * Math.PI) * 60;

  return (
    <div className="relative h-56 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      {/* Sky */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isSunUp
            ? `
              linear-gradient(
                to bottom,
                #0ea5e9 0%,
                #38bdf8 25%,
                #7dd3fc 60%,
                #fef3c7 100%
              )
            `
            : `
              linear-gradient(
                to bottom,
                #020617 0%,
                #0f172a 40%,
                #1e293b 100%
              )
            `,
        }}
      />

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background:
            "linear-gradient(to top, rgba(251,191,36,.25), transparent)",
        }}
      />

      {/* Sunrise */}
      <div className="absolute left-4 bottom-4 z-20 flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-md">
        <Sunrise className="h-4 w-4 text-orange-400" />
        <span className="text-xs font-medium text-white">{sunRise}</span>
      </div>

      {/* Sunset */}
      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-md">
        <Sunset className="h-4 w-4 text-yellow-300" />
        <span className="text-xs font-medium text-white">{sunSet}</span>
      </div>

      {/* Sun */}
      <div
        className="absolute z-10 h-12 w-12 rounded-full transition-all duration-700"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #fef08a 0%, #facc15 50%, #f59e0b 100%)",
          boxShadow:
            "0 0 40px rgba(250,204,21,.9), 0 0 90px rgba(250,204,21,.5)",
          opacity: isSunUp ? 1 : 0.3,
        }}
      />

      {/* Night stars */}
      {!isSunUp && (
        <>
          <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[35%] top-[12%] h-1.5 w-1.5 rounded-full bg-white" />
          <div className="absolute left-[70%] top-[25%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[85%] top-[15%] h-1.5 w-1.5 rounded-full bg-white" />
          <div className="absolute left-[55%] top-[35%] h-1 w-1 rounded-full bg-white" />
        </>
      )}

      {/* Debug info */}
      <div className="absolute top-4 right-4 rounded-xl bg-black/20 px-3 py-2 text-xs text-white backdrop-blur-md">
        {(p * 100).toFixed(0)}%
      </div>
    </div>
  );
}
