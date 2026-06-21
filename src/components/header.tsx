import { useNavigate } from "react-router-dom";
import { MapPin, BellRing, Search } from "lucide-react";
// store
import { useSearchStore } from "../stores/search.store";
import { useDegreeUnit } from "../stores/degreeUnit.store";
import { useCurrentHomeData } from "../stores/CurrentHomeData.store";
import { useLanguage } from "../stores/lang.store";
export default function Header() {
  const lang=useLanguage((state)=>state.lang)
  const setLang=useLanguage((state)=>state.setLang)
  const navigate = useNavigate();

  // store
  const homeData = useCurrentHomeData((state) => state.homeData);
  const query = useSearchStore((state) => state.query);
  const changeQuery = useSearchStore((state) => state.setQuery);
  const unit = useDegreeUnit((state) => state.degreeUnit);
  const setUnit = useDegreeUnit((state) => state.setDegreeUnit);

  const handleSearch = (e: string) => {
    if (e === "Enter") navigate(`/Search?q=${query}`);
  };
  return (
    <div className="flex items-center justify-between w-full px-4 py-3">
      {/* LEFT */}
      <div className="flex items-center gap-3 text-white">
        <MapPin className="text-blue-400" />

        <div className="leading-tight">
          <h2 className="font-semibold text-lg">
            {homeData?.location?.name} /{homeData?.location?.country}
          </h2>
          <p className="text-xs text-gray-300">
            lon: {homeData?.location?.lon} • lat: {homeData?.location?.lat}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* UNIT TOGGLE */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
          <button
            onClick={() => setUnit("f")}
            className={`px-3 py-1 text-sm rounded-full transition ${
              unit === "f"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            °F
          </button>

          <button
            onClick={() => setUnit("c")}
            className={`px-3 py-1 text-sm rounded-full transition ${
              unit === "c"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            °C
          </button>
        </div>
        {/* lang TOGGLE */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
          <button
            onClick={() => setLang("ar")}
            className={`px-3 py-1 text-sm rounded-full transition ${
              lang === "ar"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            arabic
          </button>

          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-sm rounded-full transition ${
              lang === "en"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            english
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            onKeyDown={(e) => handleSearch(e.key)}
            placeholder="Search city..."
            className="pl-10 pr-4 py-2 w-56 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* NOTIFICATION */}
        <button className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition active:scale-95">
          <BellRing size={18} />
        </button>
      </div>
    </div>
  );
}
