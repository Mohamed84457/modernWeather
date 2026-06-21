export function formatDateTime(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr.replace(" ", "T"));

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
// change datetime to only date
export function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr.replace(" ", "T"));

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

// this convert date time to 12 hour
export function formatTo12Hour(dateTime: string): string {
  const date = new Date(dateTime.replace(" ", "T"));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
// this convert date time to 24 hour
export function formatTo24Hour(dateTime: string): string {
  const date = new Date(dateTime.replace(" ", "T"));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    // minute: "2-digit",
    hour12: false,
  });
}

// check is today
export function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

// is time now
export function isNow(timeString: string) {
  const now = new Date();
  const target = new Date(timeString);

  return (
    now.getHours() === target.getHours() &&
    now.getDate() === target.getDate()
  );
}
