import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";

export interface TimesheetRendererRowProps {
  viewMode: TimesheetViewMode;
  row: TimesheetLineRecord;
}

export function TimesheetRendererRow({ row }: TimesheetRendererRowProps) {
  return (
    <li>
      <span>{row.id}</span>
      <span>{row.startTime}</span>
      <span>{row.endTime}</span>
      <span>00:00</span>
    </li>
  );
}
