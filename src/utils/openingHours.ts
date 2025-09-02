// utils/openingHours.ts
type TimeInterval = { start: string; end: string }; // "HH:MM" 24h
export type WeeklyHours = Record<0 | 1 | 2 | 3 | 4 | 5 | 6, TimeInterval[]>; // 0=Sun … 6=Sat

type GetOpenLabelParams = {
  weeklyHours: WeeklyHours;
  holidays?: string[]; // ISO dates like "2025-12-25" (closed all day)
  now?: Date; // for testing; defaults to new Date()
  timeZone?: string; // e.g., "Europe/Vienna"
  closesAtLabel?: string;
  opensAtLabel?: string;
};

const WEEKDAY_ABBR: Record<number, string> = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

function parseHM(hm: string): number {
  // returns minutes since midnight
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function fmtHM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}`;
}

function getLocalParts(d: Date, timeZone: string) {
  // Get local parts in the given TZ without extra libs
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  // "YYYY-MM-DD, HH:MM:SS"
  const parts = fmt.format(d).replace(",", "");
  const [dateStr, timeStr] = parts.split(" ");
  const [y, mo, da] = dateStr.split("-").map(Number);
  const [hh, mi] = timeStr.split(":").map(Number);

  // weekday in TZ
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" })
      .formatToParts(d)
      .find((p) => p.type === "weekday")!.value
  );

  return { y, mo, da, hh, mi, weekday };
}

function isHoliday(y: number, mo: number, da: number, holidays?: string[]) {
  if (!holidays?.length) return false;
  const iso = `${y}-${String(mo).padStart(2, "0")}-${String(da).padStart(
    2,
    "0"
  )}`;
  return holidays.includes(iso);
}

/**
 * Returns a label like:
 * - "opens at 17:00" (currently closed, next opening today)
 * - "opens MON 11:30" (currently closed, next opening on another day)
 * - "closes at 21:00" (currently open)
 */
export function getOpenLabel({
  weeklyHours,
  holidays = [],
  now = new Date(),
  timeZone = "Europe/Vienna",
  closesAtLabel,
  opensAtLabel,
}: GetOpenLabelParams): string {
  const { y, mo, da, hh, mi, weekday } = getLocalParts(now, timeZone);
  const minutesNow = hh * 60 + mi;

  // Helper to get intervals for a given day index, with holiday/Sunday handling
  const intervalsFor = (
    dayIdx: number,
    ymd?: { y: number; mo: number; da: number }
  ) => {
    // If specific Y/M/D known (today), check holiday; for future days we compute date by offset below.
    if (ymd && isHoliday(ymd.y, ymd.mo, ymd.da, holidays))
      return [] as TimeInterval[];
    return weeklyHours[dayIdx as 0 | 1 | 2 | 3 | 4 | 5 | 6] ?? [];
  };

  // Build today's intervals unless holiday
  const todaysIntervals = intervalsFor(weekday, { y, mo, da })
    .map((iv) => ({ start: parseHM(iv.start), end: parseHM(iv.end) }))
    .sort((a, b) => a.start - b.start);

  // 1) If currently open, find current interval and its end.
  for (const iv of todaysIntervals) {
    if (minutesNow >= iv.start && minutesNow < iv.end) {
      return `${closesAtLabel ?? "closes at"} ${fmtHM(iv.end)}`;
    }
  }

  // 2) Currently closed → find next opening today after now.
  const nextToday = todaysIntervals.find((iv) => minutesNow < iv.start);
  if (nextToday) {
    return `${opensAtLabel ?? "opens at"} ${fmtHM(nextToday.start)}`;
  }

  // 3) Search following days for the next open interval.
  // We need to step through calendar days in the given TZ to check holidays correctly.
  for (let offset = 1; offset <= 14; offset++) {
    // Construct the date in TZ + offset days.
    // We’ll make a Date from the YYYY-MM-DD parts plus offset using UTC math, then read it back in TZ.
    const base = new Date(Date.UTC(y, mo - 1, da, 12, 0, 0)); // noon UTC to avoid DST issues
    const future = new Date(base.getTime() + offset * 24 * 60 * 60 * 1000);

    // Read future date parts in TZ
    const partsFmt = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    }).formatToParts(future);

    const yPart = Number(partsFmt.find((p) => p.type === "year")!.value);
    const mPart = Number(partsFmt.find((p) => p.type === "month")!.value);
    const dPart = Number(partsFmt.find((p) => p.type === "day")!.value);
    const wdLabel = partsFmt.find((p) => p.type === "weekday")!.value; // "Sun".."Sat"
    const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
      wdLabel
    );

    const dayIntervals = isHoliday(yPart, mPart, dPart, holidays)
      ? []
      : weeklyHours[wd as 0 | 1 | 2 | 3 | 4 | 5 | 6] ?? [];

    if (dayIntervals.length > 0) {
      const first = dayIntervals
        .map((iv) => parseHM(iv.start))
        .sort((a, b) => a - b)[0];

      // same-day vs different-day label (but we're offset>=1, so different day)
      return `opens ${WEEKDAY_ABBR[wd]} ${fmtHM(first)}`;
    }
  }

  // If we somehow didn't find anything in 2 weeks, declare closed (safety).
  return "closed";
}
