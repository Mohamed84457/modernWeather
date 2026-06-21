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
    <div className="flex items-center justify-between w-full py-1 gap-2">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3 text-white min-w-0">
        <MapPin className="text-blue-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />

        <div className="leading-tight min-w-0">
          <h2 className="font-semibold text-sm sm:text-lg truncate">
            {homeData?.location?.name} / {homeData?.location?.country}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-300 hidden sm:block truncate">
            lon: {homeData?.location?.lon} • lat: {homeData?.location?.lat}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-end flex-shrink-0">
        {/* UNIT TOGGLE */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-0.5 sm:p-1 flex-shrink-0">
          <button
            onClick={() => setUnit("f")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm rounded-full transition ${
              unit === "f"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            °F
          </button>

          <button
            onClick={() => setUnit("c")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm rounded-full transition ${
              unit === "c"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            °C
          </button>
        </div>

        {/* lang TOGGLE */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-0.5 sm:p-1 flex-shrink-0">
          <button
            onClick={() => setLang("ar")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm rounded-full transition ${
              lang === "ar"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="hidden sm:inline">arabic</span>
            <span className="sm:hidden">AR</span>
          </button>

          <button
            onClick={() => setLang("en")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm rounded-full transition ${
              lang === "en"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="hidden sm:inline">english</span>
            <span className="sm:hidden">EN</span>
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
        <button className="p-1.5 sm:p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition active:scale-95 flex-shrink-0">
          <BellRing size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </div>
  );
}
