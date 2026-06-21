import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
// components
import SearchResults  from "./components/searchCard";
import type{ SearchItem } from "./components/searchCard";
// actions
import { GetSearchData } from "../../api/requests/SearchReuest";
// store
import { useSearchStore } from "../../stores/search.store";
import { useLanguage } from "../../stores/lang.store";
import { useEffect, useState } from "react";
export default function Search() {
    const lang=useLanguage((state)=>state.lang)

  // loading
  const [loading, setLoading] = useState(false);
  // result
  const [result, setResult] = useState<SearchItem[]>([]);
  const navigate = useNavigate();
  //   store
  const query = useSearchStore((state) => state.query);
  const changeQuery = useSearchStore((state) => state.setQuery);

  //   get search query
  const [searchParams] = useSearchParams();
  const city = searchParams.get("q");
  //   get lat and lon of city

  useEffect(() => {
    if (city) {
      changeQuery(city);
    }
  }, [city]);
  console.log(city);
  const handleSearch = (key: string) => {
    if (key === "Enter") {
      navigate(`/search?q=${query}`);
    }
  };
  //   get search result
  useEffect(() => {
    const getSearchData = (searchCity: string) => {
      setLoading(true);
      GetSearchData(searchCity, lang).then((res) => {
        console.log("res:", res);
        setLoading(false);
        setResult(res.data);
      });
    };
    if (city) {
      getSearchData(city);
    }
  }, [city, lang]);
  //   handle select city
  const handleSelectCity = (item: SearchItem) => {
    navigate(`/Weather?lat=${item?.lat}&lon=${item?.lon}`);
  };
  return (
    <div>
      <div className="relative ">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          onKeyDown={(e) => handleSearch(e.key)}
          placeholder="Search city ..."
          className="pl-10 pr-4 py-2 w-56 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* result */}
      <h2 className="text-gray-500 text-md mt-3">search result </h2>
      <div>
        {loading && (
          <div className="flex items-center justify-center min-h-[50vh] text-white">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              <p className="text-sm text-gray-300">Loading weather data...</p>
            </div>
          </div>
        )}
        {!city ? (
          <h2 className="text-gray-500 mt-2 text-center">typing to search</h2>
        ) : (
          <div>
            {result?.length < 1 ? (
              <h2 className="text-gray-500 mt-2 text-center">
                can not find city or region
              </h2>
            ) : (
              <SearchResults results={result} onSelect={handleSelectCity} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
