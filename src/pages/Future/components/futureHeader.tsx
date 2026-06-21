import type { location } from "../../../types/HomeData";

interface Props {
  location: location;
}

export default function LocationCard({ location }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-[#0f172a] text-white p-5 shadow-lg border border-white/10">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-3">📍 {location.name}</h2>

      {/* Info grid */}
      <div className="space-y-2 text-sm text-gray-300">
        <p>
          <span className="text-gray-400">Region:</span> {location.region}
        </p>

        <p>
          <span className="text-gray-400">Country:</span> {location.country}
        </p>

        <p>
          <span className="text-gray-400">Coordinates:</span> {location.lat},{" "}
          {location.lon}
        </p>

        <p>
          <span className="text-gray-400">Timezone:</span> {location.tz_id}
        </p>

        <p>
          <span className="text-gray-400">Local time:</span>{" "}
          {location.localtime}
        </p>
      </div>

      {/* Footer badge */}
      <div className="mt-4 text-xs text-gray-400 border-t border-white/10 pt-3">
        Epoch: {location.localtime_epoch}
      </div>
    </div>
  );
}
