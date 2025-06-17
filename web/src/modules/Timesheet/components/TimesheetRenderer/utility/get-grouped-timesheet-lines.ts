import type { TimesheetLineRecord } from "#types/entity/timesheet.types";

export interface CategoryGroupedTimesheetLines {
  [k: number]: TimesheetLineRecord[];
}

export interface TimeGroupedTimesheetLines {
  all: TimesheetLineRecord[];
}

export type GroupedTimesheetLines = TimeGroupedTimesheetLines | CategoryGroupedTimesheetLines;

export interface GetGroupedTimesheetLinesProps {
  date: string | Date;
  lines: TimesheetLineRecord[];
  by: 'by-category' | 'by-time';
}

function getSortLinesByTime(date: string | Date) {
  const stamp = `${date}`.split('T')[0];

  return function sortLinesByTime(a: TimesheetLineRecord, b: TimesheetLineRecord) {
    const aEndDate = `${stamp} ${a.endTime}:00.000`;
    const bEndDate = `${stamp} ${b.endTime}:00.000`;

    return Date.parse(bEndDate) - Date.parse(aEndDate);
  };
}

export function getGroupedTimesheetLines({ by, lines, date }: GetGroupedTimesheetLinesProps): GroupedTimesheetLines {
  const sortingFn = getSortLinesByTime(date);

  if (by === 'by-time') {
    const sortedLines = lines.slice();

    sortedLines.sort(sortingFn);

    return { all: sortedLines } as TimeGroupedTimesheetLines;
  }

  const grouped: CategoryGroupedTimesheetLines = {};

  for (const line of lines) {
    if (!grouped[line.categoryId]) {
      grouped[line.categoryId] = [line];
    } else {
      grouped[line.categoryId].push(line);
    }
  }

  return grouped;
}