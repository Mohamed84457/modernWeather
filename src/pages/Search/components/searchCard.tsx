import { MapPin, Globe } from "lucide-react";

interface SearchItem {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface Props {
  results: SearchItem[];
  onSelect?: (item: SearchItem) => void;
}

export default function SearchResults({ results, onSelect }: Props) {
  if (!results?.length) return null;

  return (
    <div className="mt-4 w-full space-y-3">
      {results.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect?.(item)}
          className="
            w-full text-left
            rounded-xl
            bg-white/10
            backdrop-blur-md
            border border-white/20
            p-4
            hover:bg-white/20
            transition
            flex items-start justify-between
          "
        >
          {/* LEFT */}
          <div>
            <h3 className="text-white font-semibold">{item.name}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
              <MapPin size={14} />
              <span>{item.region}</span>
              <span>•</span>
              <span>{item.country}</span>
            </div>
          </div>

          {/* RIGHT */}
          <Globe className="text-blue-300 w-5 h-5 mt-1" />
        </button>
      ))}
    </div>
  );
}