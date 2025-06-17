import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { getGroupedTimesheetLines } from "./utility/get-grouped-timesheet-lines";

export interface TimesheetRendererProps {
  viewMode: TimesheetViewMode;
  date?: Date | string;
  lines?: TimesheetLineRecord[];
}

export function TimesheetRenderer({
  viewMode,
  date,
  lines,
}: TimesheetRendererProps) {
  if (!date || !lines) {
    return <>Loading...</>;
  }

  return (
    <div>
      {JSON.stringify(
        getGroupedTimesheetLines({
          by: viewMode,
          date,
          lines,
        })
      )}
    </div>
  );
}
