import { Route, Routes } from "react-router-dom";
// pages
import Home from "./pages/Home/Home";
import Historical from "./pages/Historical/Historical";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Forecast from "./pages/Forecast/Forecast";
import Search from "./pages/Search/Search";
import Astronomy from "./pages/Astronomy/Astronomy";
import TimeZoneConverter from "./pages/TimeZoneConverter/Time Zone Converter";
import CurrentWeather from "./pages/CurrentWeather/CurrentWeather";
import Layout from "./pages/Layout";
import Weather from "./pages/Weather/Weather";
import Future from "./pages/Future/Future";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("en");
  }, []);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="en">
            <Route index element={<Home />} />
            <Route path="Forecast" element={<Forecast />} />
            <Route path="Search" element={<Search />} />
            <Route path="Historical" element={<Historical />} />
            <Route path="CurrentWeather" element={<CurrentWeather />} />
            <Route path="Weather" element={<Weather />} />
            <Route path="Astronomy" element={<Astronomy />} />
            <Route path="TimeZoneConverter" element={<TimeZoneConverter />} />
            <Route path="Future" element={<Future />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
