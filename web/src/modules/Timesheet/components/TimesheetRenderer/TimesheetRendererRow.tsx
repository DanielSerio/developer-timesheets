import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { Text } from "@mantine/core";

export interface TimesheetRendererRowProps {
  viewMode: TimesheetViewMode;
  row: TimesheetLineRecord;
}

export function TimesheetRendererRow({ row }: TimesheetRendererRowProps) {
  return (
    <li>
      <span>{row.id}</span>
      <Text title={row.note ?? undefined} lineClamp={1}>
        {row.note}
      </Text>
      <span>{row.startTime}</span>
      <span>{row.endTime}</span>
      <span>00:00</span>
    </li>
  );
}
