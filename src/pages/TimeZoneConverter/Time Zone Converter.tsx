import { useEffect, useState } from "react";
import type { location } from "../../types/HomeData";
import { useUserLocation } from "../../stores/userLocation.store";
import { GetTimeZoneData } from "../../api/requests/TimeZoneRequest";
import { useLanguage } from "../../stores/lang.store";
export default function TimeZoneConverter() {
  const lang = useLanguage((state) => state.lang);

  const userLocation = useUserLocation((state) => state.location);
  const { lat, log } = userLocation;

  const [fromRegionData, setFromRegionData] = useState<location | null>(null);
  const [toRegionData, setToRegionData] = useState<location | null>(null);

  const [fromRegion, setFromRegion] = useState("");
  const [toRegion, setToRegion] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [resultTime, setResultTime] = useState("");

  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [convertLoading, setConvertLoading] = useState(false);
  const [fromError, setFromError] = useState<string | null>(null);
  const [toError, setToError] = useState<string | null>(null);
  const [convertError, setConvertError] = useState<string | null>(null);

  // Given a wall-clock time (h, m) intended to be in IANA timezone `tz`,
  // figure out the correct UTC Date.
  function zonedTimeToUtc(date: Date, h: number, m: number, tz: string): Date {
    const naiveUTC = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        h,
        m,
        0,
        0,
      ),
    );

    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const parts = dtf
      .formatToParts(naiveUTC)
      .reduce<Record<string, string>>((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});

    const asUTC = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour === "24" ? "0" : parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );

    const diff = naiveUTC.getTime() - asUTC;
    return new Date(naiveUTC.getTime() + diff);
  }

  // load user location on mount (auto-detected "from" timezone)
  useEffect(() => {
    const load = async () => {
      if (!lat || !log) return;

      setFromLoading(true);
      setFromError(null);
      try {
        const res = await GetTimeZoneData(lat, log, null, lang);
        const loc = res?.data?.location;
        if (!loc?.tz_id) {
          setFromError("Couldn't detect your location's timezone.");
          return;
        }
        setFromRegionData(loc);
        setFromRegion(loc.name);
      } catch (err) {
        setFromError("Failed to load your location. Please try again.");
      } finally {
        setFromLoading(false);
      }
    };

    load();
  }, [lat, log]);

  // re-lookup "from" timezone when user edits the from-city field
  const lookupFromRegion = async () => {
    if (!fromRegion.trim()) return;

    setFromLoading(true);
    setFromError(null);
    try {
      const res = await GetTimeZoneData(null, null, fromRegion, lang);
      const loc = res?.data?.location;
      if (!loc?.tz_id) {
        setFromError(`Couldn't find timezone for "${fromRegion}".`);
        return;
      }
      setFromRegionData(loc);
    } catch (err) {
      setFromError("Failed to look up that city. Please try again.");
    } finally {
      setFromLoading(false);
    }
  };

  // lookup "to" timezone
  const lookupToRegion = async (): Promise<location | null> => {
    if (!toRegion.trim()) {
      setToError("Enter a destination city.");
      return null;
    }

    setToLoading(true);
    setToError(null);
    try {
      const res = await GetTimeZoneData(null, null, toRegion, lang);
      const loc = res?.data?.location;
      if (!loc?.tz_id) {
        setToError(`Couldn't find timezone for "${toRegion}".`);
        return null;
      }
      setToRegionData(loc);
      return loc;
    } catch (err) {
      setToError("Failed to look up that city. Please try again.");
      return null;
    } finally {
      setToLoading(false);
    }
  };

  // convert using real timezone system
  const convertTime = async () => {
    setConvertError(null);
    setResultTime("");

    if (!fromRegionData?.tz_id) {
      setConvertError("Set a valid 'from' city first.");
      return;
    }
    if (!fromTime) {
      setConvertError("Pick a time to convert.");
      return;
    }
    if (!toRegion.trim()) {
      setConvertError("Enter a destination city.");
      return;
    }

    setConvertLoading(true);
    try {
      const to = await lookupToRegion();
      if (!to?.tz_id) return; // error already set by lookupToRegion

      const [h, m] = fromTime.split(":").map(Number);
      const utcInstant = zonedTimeToUtc(new Date(), h, m, fromRegionData.tz_id);

      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: to.tz_id,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setResultTime(formatter.format(utcInstant));
    } catch (err) {
      setConvertError("Something went wrong converting the time.");
    } finally {
      setConvertLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Time Zone Converter
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Convert a time between two cities.
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">From</label>
          {fromRegionData?.tz_id && (
            <span className="text-xs text-slate-400 font-mono">
              {fromRegionData.tz_id}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            className="border border-slate-300 rounded-lg px-3 py-2 flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
            value={fromRegion}
            onChange={(e) => setFromRegion(e.target.value)}
            placeholder="From city"
          />
          <button
            onClick={lookupFromRegion}
            disabled={fromLoading || !fromRegion.trim()}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            type="button"
          >
            {fromLoading ? "..." : "Use"}
          </button>
        </div>
        {fromError && <p className="text-xs text-red-600">{fromError}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">To</label>
          {toRegionData?.tz_id && (
            <span className="text-xs text-slate-400 font-mono">
              {toRegionData.tz_id}
            </span>
          )}
        </div>
        <input
          className="border border-slate-300 rounded-lg px-3 py-2 w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
          value={toRegion}
          onChange={(e) => setToRegion(e.target.value)}
          placeholder="To city (e.g. Paris)"
        />
        {toError && <p className="text-xs text-red-600">{toError}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Time</label>
        <input
          type="time"
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
        />
      </div>

      <button
        onClick={convertTime}
        disabled={convertLoading || fromLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        type="button"
      >
        {convertLoading ? "Converting…" : "Convert"}
      </button>

      {convertError && (
        <p className="text-xs text-red-600 -mt-2">{convertError}</p>
      )}

      {resultTime && (
        <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">
            {resultTime}
          </p>
          {toRegionData?.name && (
            <p className="text-sm text-slate-500 mt-0.5">
              in {toRegionData.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
