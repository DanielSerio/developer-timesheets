import { useEffect, useState } from "react";

export type TimesheetViewMode = "by-time" | "by-category";

export function useTimesheetViewMode(defaultViewMode?: TimesheetViewMode) {
  const controller = useState<TimesheetViewMode>(defaultViewMode ?? "by-time");
  const [state, setViewMode] = controller;

  useEffect(() => {
    if (defaultViewMode) {
      setViewMode(defaultViewMode);
    }
  }, [defaultViewMode]);

  const toggleViewMode = () =>
    setViewMode((mode) => (mode === "by-category" ? "by-time" : "by-category"));

  return [state, toggleViewMode, setViewMode] as const;
}
