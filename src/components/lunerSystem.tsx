import { Moon, ArrowUp, ArrowDown } from "lucide-react";

export function MoonPhase({
  illumination = 30,
  is_moon_up,
  moon_phase = "Waxing Crescent",
  moonset = "10:42 PM",
  moonrise = "11:23 AM",
}: {
  illumination: number;
  is_moon_up: number;
  moon_phase: string;
  moonset: string;
  moonrise: string;
}) {
  const phase = illumination / 100;
  const shadowOffset = (1 - phase) * 80;

  return (
    <div className="
      relative overflow-hidden
      rounded-3xl
      border border-white/10
      bg-gradient-to-b
      from-slate-900/90
      via-slate-950
      to-black
      backdrop-blur-xl
      p-5
      shadow-[0_20px_50px_rgba(0,0,0,0.35)]
    ">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4 text-indigo-300" />

          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Lunar Phase
          </span>
        </div>

        <span
          className={`
            rounded-full px-2.5 py-1 text-xs font-medium
            ${is_moon_up
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-slate-700/50 text-slate-400"}
          `}
        >
          {is_moon_up ? "Moon Up" : "Moon Down"}
        </span>
      </div>

      {/* Moon */}
      <div className="relative mt-4 flex justify-center">
        <div className="absolute h-32 w-32 rounded-full bg-indigo-400/10 blur-3xl" />

        <svg
          viewBox="0 0 120 120"
          className="relative h-40 w-40 drop-shadow-[0_0_35px_rgba(255,255,220,0.25)]"
        >
          <defs>
            <radialGradient id="moonGradient">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#d6dbe4" />
            </radialGradient>

            <clipPath id="moonClip">
              <circle cx="60" cy="60" r="45" />
            </clipPath>
          </defs>

          {/* Moon */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="url(#moonGradient)"
          />

          {/* Craters */}
          <g opacity="0.12">
            <circle cx="42" cy="42" r="6" fill="#64748b" />
            <circle cx="78" cy="48" r="4" fill="#64748b" />
            <circle cx="55" cy="75" r="8" fill="#64748b" />
            <circle cx="80" cy="72" r="5" fill="#64748b" />
            <circle cx="35" cy="65" r="4" fill="#64748b" />
          </g>

          {/* Shadow */}
          <g clipPath="url(#moonClip)">
            <ellipse
              cx={60 + shadowOffset}
              cy="60"
              rx="45"
              ry="45"
              fill="#020617"
            />
          </g>

          {/* Rim */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Phase */}
      <div className="relative mt-2 text-center">
        <h2 className="text-xl font-semibold text-white">
          {moon_phase}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Current lunar phase
        </p>

        <div
          className="
            mx-auto mt-3 w-fit
            rounded-full
            border border-indigo-400/20
            bg-indigo-500/10
            px-4 py-1.5
            text-sm font-medium
            text-indigo-200
          "
        >
          {illumination}% Illuminated
        </div>
      </div>

      {/* Details */}
      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ArrowUp size={14} />
            <span className="text-xs">Moonrise</span>
          </div>

          <p className="mt-1 text-sm font-medium text-white">
            {moonrise}
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ArrowDown size={14} />
            <span className="text-xs">Moonset</span>
          </div>

          <p className="mt-1 text-sm font-medium text-white">
            {moonset}
          </p>
        </div>
      </div>
    </div>
  );
}