import { Outlet } from "react-router-dom";
// components
import SideBar from "../components/sideBar";
import Header from "../components/header";
// icons
import { Menu, X } from "lucide-react";
// store
import { useSidebarStore } from "../stores/sidebar.store";
import { useCurrentHomeData } from "../stores/CurrentHomeData.store";
import { useUserLocation } from "../stores/userLocation.store";
import { useLanguage } from "../stores/lang.store";

import { useEffect, useState } from "react";
// actions
import {
  GetCurrentWeatherDependonLatLog,
  GetForecastWeather,
} from "../api/requests/HomeRequst";

function Layout() {
  const lang = useLanguage((state) => state.lang);

  const setResponse = useCurrentHomeData((state) => state.setHomeData);
  const setForecastResponse = useCurrentHomeData(
    (state) => state.setHomeForecastData,
  );

  const userLocation = useUserLocation((state) => state.location);
  const setLocation = useUserLocation((state) => state.setLocation);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log("Location denied:", error.message);
        },
      );
    }
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = () => {
      const lat = userLocation.lat ?? 31.78847;
      const lon = userLocation.log ?? 31.00192;
      GetCurrentWeatherDependonLatLog(lat, lon, lang).then((res) => {
        setResponse(res.data);
        console.log(res.data);
        setLoading(false);
      });
    };
    getData();
  }, [userLocation,lang]);
  useEffect(() => {
    const getData = () => {
      const lat = userLocation.lat ?? 31.78847;
      const lon = userLocation.log ?? 31.00192;
      GetForecastWeather(1, lat, lon, null, lang).then((res) => {
        setForecastResponse(res.data);
        setLoading(false);
      });
    };
    getData();
  }, [userLocation,lang]);

  const status = useSidebarStore((state) => state.status);
  const changeStatus = useSidebarStore((state) => state.setStatus);
  return (
    <div className="min-h-screen bg-slate-950 flex scroll-smooth relative overflow-x-hidden w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] rounded-full bg-sky-400/10 blur-[100px]" />
      </div>
      {/* Sidebar */}
      {/* gray background in mobile diplay */}
      {status && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => changeStatus(false)}
        />
      )}

      <aside
        className={`
    fixed top-0 left-0 z-50
    h-screen w-64 
    bg-slate-900/95 backdrop-blur-xl scroll-m-4
    border-r border-white/10 
    transform transition-transform duration-300
    md:translate-x-0 md:static md:h-auto md:bg-transparent md:border-none
    ${status ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <button
          className="absolute z-50 top-4 right-4 md:hidden text-white cursor-pointer transform  hover:scale-110 active:scale-80 transition-all duration-150"
          onClick={() => changeStatus(false)}
        >
          <X size={24} />
        </button>

        <div className="p-4 ">
          <SideBar />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 w-full max-w-full overflow-hidden">
        <div className="flex flex-col min-h-[calc(100vh-2rem)] rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          {/* Header */}
          <header className="flex items-center px-4 md:px-6 py-3 border-b border-white/10">
            <button
              className="bg-white/10 backdrop-blur md:hidden p-2 rounded-lg text-white cursor-pointer hover:bg-white/20 transition-all duration-150 mr-2.5 flex-shrink-0"
              onClick={() => changeStatus(true)}
              type="button"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1 min-w-0">
              {!loading && <Header />}
            </div>
          </header>

          {/* Content */}
          <section className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </section>

          {/* Footer */}
          <footer className="px-4 md:px-6 py-4 border-t border-white/10 text-center text-sm text-gray-400">
            © 2026 DMT Weather • Powered by WeatherAPI
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Layout;
