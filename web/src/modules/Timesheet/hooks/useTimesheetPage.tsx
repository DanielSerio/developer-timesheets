import { useTimesheet } from "#hooks/query/useTimesheet";
import { useState } from "react";
import {
  useTimesheetViewMode,
  type TimesheetViewMode,
} from "./useTimesheetViewMode";

export interface UseTimesheetPageProps {
  timesheetId?: number;
  defaultViewMode?: TimesheetViewMode;
}

export function useTimesheetPage({
  timesheetId,
  defaultViewMode,
}: UseTimesheetPageProps) {
  const [isEditMode, _setIsEditMode] = useState(false);
  const viewModeController = useTimesheetViewMode(defaultViewMode);
  const [_, __, setViewMode] = viewModeController;
  const query = useTimesheet(timesheetId, true);

  const setIsEditMode = (value: boolean) => {
    if (value) {
      _setIsEditMode(true);
    } else {
      _setIsEditMode(false);
      setViewMode(defaultViewMode ?? "by-time");
    }
  };

  const editModeController = [isEditMode, setIsEditMode] as const;

  return {
    query,
    editModeController,
    viewModeController,
  };
}
