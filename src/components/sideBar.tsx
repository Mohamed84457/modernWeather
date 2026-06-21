import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// store
import { useSidebarStore } from "../stores/sidebar.store";

// icons
import {
  House,
  ThermometerSun,
  History,
  ChartSpline,
  Search,
  Telescope,
  AlarmClock,
  TimerReset,
} from "lucide-react";

export default function SideBar() {
  const changestatus = useSidebarStore((state) => state.setStatus);
  const navgations = [
    {
      label: "Home",
      path: "/en",
      icons: <House />,
    },
    {
      label: "CurrentWeather",
      path: "/CurrentWeather",
      icons: <ThermometerSun />,
    },
    {
      label: "Historical",
      path: "/Historical",
      icons: <History />,
    },
    {
      label: "Forecast",
      path: "/Forecast",
      icons: <ChartSpline />,
    },
    {
      label: "Search",
      path: "/Search",
      icons: <Search />,
    },
    {
      label: "Astronomy",
      path: "/Astronomy",
      icons: <Telescope />,
    },
    {
      label: "TimeZoneConverter",
      path: "/TimeZoneConverter",
      icons: <AlarmClock />,
    },
    {
      label: "Future",
      path: "/Future",
      icons: <TimerReset />,
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const page =
    navgations.find((n) => n.path === location.pathname)?.label || "Home";
  return (
    <div className="flex flex-col h-screen  py-6 bg-white/10 backdrop-blur-lg border-r border-white/20 rounded-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
          DMT Weather
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Professional Weather Dashboard
        </p>

        <div className="mt-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {page}
          </span>
        </div>
      </div>

      <div className=" flex flex-col gap-3 mx-2">
        {navgations.map((n) => {
          const active = location.pathname === n.path;

          return (
            <button
              key={n.path}
              onClick={() => {
                navigate(n.path);
                setTimeout(() => {
                  changestatus(false);
                }, 300);
              }}
              className={`
            relative flex items-center justify-center
            px-4 py-3 rounded-xl mt-2
            font-medium transition-all duration-300 cursor-pointer
            ${
              active
                ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }
          `}
            >
              {active && (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white" />
              )}
              <div className="flex items-center gap-1">
                {n.icons}
                {n.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
