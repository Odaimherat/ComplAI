import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/**
 * A small calendar-style picker: the next 5 weekdays, each with a
 * handful of time slots split into morning/afternoon groups. This
 * replaces the earlier version of the demo flow, where the server
 * picked a random slot after submission - letting the visitor actually
 * choose is both more realistic and a better demo of interactive UI
 * work. The chosen slot is passed up as a plain label string (e.g.
 * "Tue, Jul 21 - 2:00 PM") via `onSelect`, which the parent form sends
 * to the API as `preferredSlot`.
 */
const MORNING_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM"];
const AFTERNOON_TIMES = ["1:00 PM", "2:00 PM", "3:30 PM"];

function nextWeekdays(count) {
  const days = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1); // start tomorrow
  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export default function DemoSlotPicker({ value, onSelect }) {
  const { t } = useLanguage();
  const days = useMemo(() => nextWeekdays(5), []);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = days[activeDayIndex];

  function dayLabel(day) {
    return day.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }

  function pick(time) {
    onSelect(`${dayLabel(activeDay)} - ${time}`);
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4" dir="ltr">
      <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-muted)] mb-3">{t("demo.pickATime")}</p>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
        {days.map((day, i) => (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => setActiveDayIndex(i)}
            className={`shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-lg border text-xs transition-colors ${
              i === activeDayIndex
                ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            <span className="font-mono">{day.toLocaleDateString(undefined, { weekday: "short" })}</span>
            <span className="font-display font-semibold text-sm">{day.getDate()}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase text-[var(--color-text-faint)] mb-1.5">{t("demo.morning")}</p>
          <div className="flex flex-col gap-1.5">
            {MORNING_TIMES.map((time) => {
              const label = `${dayLabel(activeDay)} - ${time}`;
              const selected = value === label;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => pick(time)}
                  className={`text-xs rounded-md px-2 py-1.5 border transition-colors ${
                    selected
                      ? "border-[var(--color-accent-strong)] bg-[var(--color-accent)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase text-[var(--color-text-faint)] mb-1.5">{t("demo.afternoon")}</p>
          <div className="flex flex-col gap-1.5">
            {AFTERNOON_TIMES.map((time) => {
              const label = `${dayLabel(activeDay)} - ${time}`;
              const selected = value === label;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => pick(time)}
                  className={`text-xs rounded-md px-2 py-1.5 border transition-colors ${
                    selected
                      ? "border-[var(--color-accent-strong)] bg-[var(--color-accent)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {value && (
        <p className="text-xs text-[var(--color-pass)] mt-3 font-mono flex items-center gap-1.5">
          <Check size={13} /> {value}
        </p>
      )}
    </div>
  );
}
