import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { getGroupedTimesheetLines } from "../../utilities/get-grouped-timesheet-lines";
import { useCategoryList } from "#hooks/query/useCategoryList";
import { TimesheetRendererRowGroup } from "./TimesheetRendererRowGroup";

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
  const categories = useCategoryList(true);

  if (!date || !lines) {
    return <>Loading...</>;
  }

  const groupedLines = getGroupedTimesheetLines({
    by: viewMode,
    date,
    lines,
  });

  if (viewMode === "by-time") {
    return (
      <TimesheetRendererRowGroup viewMode="by-time" lines={groupedLines.all} />
    );
  }

  return Object.keys(groupedLines).map((catIdStr) => {
    const categoryId = +catIdStr;
    const lines = groupedLines[catIdStr];
    const category = categories.data?.find((cat) => cat.id === categoryId);

    return (
      <TimesheetRendererRowGroup
        key={categoryId}
        viewMode="by-category"
        category={category}
        lines={lines}
      />
    );
  });
}
