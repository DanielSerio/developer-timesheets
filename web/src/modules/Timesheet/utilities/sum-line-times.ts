import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { getLineHoursAndMinutes, getLineMinutes } from "./get-line-time";
import { renderTime } from "./render-time";

function getTotalMinutes(lines: TimesheetLineRecord[], startAt: number = 0) {
  return lines.reduce((sum, line) => sum + getLineMinutes(line), startAt);
}

export function getLinesTimeSum(lines: TimesheetLineRecord[], startAt: number = 0) {
  const [hh, mm] = getLineHoursAndMinutes(getTotalMinutes(lines, startAt));

  return renderTime(`${hh}:${mm}`);
};

export function getRunningTotal(lines: TimesheetLineRecord[]) {
  return lines.reduce((sum, line) => sum + getLineMinutes(line), 0);
}