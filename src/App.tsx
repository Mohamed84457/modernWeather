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
        <Route Component={Layout}>
          <Route path="en" index Component={Home}></Route>
          <Route path="CurrentWeather" Component={CurrentWeather}></Route>
          <Route path="Historical" Component={Historical}></Route>
          <Route path="Forecast" Component={Forecast}></Route>
          <Route path="Search" Component={Search}></Route>
          <Route path="Weather" Component={Weather}></Route>
          <Route path="Astronomy" Component={Astronomy}></Route>
          <Route path="TimeZoneConverter" Component={TimeZoneConverter}></Route>
          <Route path="Future" Component={Future}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
