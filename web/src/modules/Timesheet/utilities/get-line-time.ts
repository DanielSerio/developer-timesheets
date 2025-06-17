import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { differenceInMinutes } from "date-fns";
import { renderTime } from "./render-time";

function createDate(time: string) {
  return new Date(Date.parse(`2015-12-16 ${time}:00.000`));
}

export function getLineMinutes(line: TimesheetLineRecord) {
  const startDate = createDate(line.startTime);
  const endDate = createDate(line.endTime);

  return Math.abs(differenceInMinutes(startDate, endDate));
}

export function getLineHoursAndMinutes(minutes: number): [number, number] {
  const wholeHours = ~~(minutes / 60);
  const partialHour = minutes % 60;

  return [wholeHours, +(partialHour).toPrecision(2)];
}

/**
 * Gets the time difference for a line
 */
export function getLineTime(line: TimesheetLineRecord) {
  const min = getLineMinutes(line);

  const [hours, minutes] = getLineHoursAndMinutes(min);
  console.info(`${line.startTime} ${line.endTime} = ${min}`);
  console.info(`${line.startTime} ${line.endTime} = ${hours}:${minutes}`);
  return renderTime(`${hours}:${minutes}`);
}