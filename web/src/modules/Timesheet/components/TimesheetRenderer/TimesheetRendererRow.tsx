import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import { getLineTime } from "#modules/Timesheet/utilities/get-line-time";
import { getLinesTimeSum } from "#modules/Timesheet/utilities/sum-line-times";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { Text } from "@mantine/core";

export interface TimesheetRendererRowProps {
  viewMode: TimesheetViewMode;
  row: TimesheetLineRecord;
  runningTotal: number;
}

export function TimesheetRendererRow({
  row,
  runningTotal,
}: TimesheetRendererRowProps) {
  const lineSum = getLineTime(row);

  return (
    <li>
      <span>{row.id}</span>
      <Text title={row.note ?? undefined} lineClamp={1}>
        {row.note}
      </Text>
      <span>{row.startTime}</span>
      <span>{row.endTime}</span>
      <span>{lineSum}</span>
      <span>{getLinesTimeSum([row], runningTotal)}</span>
    </li>
  );
}
