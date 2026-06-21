import {
  Telescope,
  Cloud,
  Eye,
  Stars,
} from "lucide-react";

export default function Stargazing({
  clouds = 0,
  visability = 10,
}: {
  clouds: number;
  visability: number;
}) {
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round((100 - clouds) * 0.7 + (visability * 10) * 0.3)
    )
  );

  const quality =
    score >= 85
      ? "Excellent"
      : score >= 65
        ? "Good"
        : score >= 40
          ? "Fair"
          : "Poor";

  const qualityColor =
    score >= 85
      ? "text-emerald-300"
      : score >= 65
        ? "text-sky-300"
        : score >= 40
          ? "text-amber-300"
          : "text-rose-300";

  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-b
        from-slate-900
        via-slate-950
        to-black
        p-5
        shadow-[0_20px_50px_rgba(0,0,0,.35)]
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Telescope className="size-5 text-indigo-300" />

          <div>
            <h2 className="font-semibold text-white">
              Stargazing
            </h2>

            <p className="text-xs text-slate-400">
              Night sky conditions
            </p>
          </div>
        </div>

        <div
          className={`
            rounded-full
            px-3 py-1
            text-xs font-medium
            ${qualityColor}
            bg-white/5
          `}
        >
          {quality}
        </div>
      </div>

      {/* Main Score */}
      <div className="relative mt-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <span className="text-3xl font-bold text-white">
            {score}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Stargazing Score
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Sky Quality</span>
          <span>{score}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="
              h-full rounded-full
              bg-gradient-to-r
              from-indigo-500
              via-sky-400
              to-cyan-300
            "
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Cloud size={16} />
            <span className="text-xs">Cloud Cover</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {clouds}%
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Eye size={16} />
            <span className="text-xs">Visibility</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {visability} km
          </p>
        </div>
      </div>

      {/* Footer Insight */}
      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-indigo-500/15 bg-indigo-500/10 p-3">
        <Stars className="size-4 text-indigo-300" />

        <p className="text-sm text-slate-300">
          {clouds < 25
            ? "Excellent conditions for viewing stars and constellations."
            : clouds < 60
              ? "Some clouds may partially obstruct the night sky."
              : "Heavy cloud cover will significantly reduce visibility."}
        </p>
      </div>
    </div>
  );
}