import { Box, Text } from "@mantine/core";
import type { CategoryRecord } from "#types/entity/category.types";
import type { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { TimesheetRendererRow } from "./TimesheetRendererRow";
import type { TimesheetViewMode } from "#modules/Timesheet/hooks/useTimesheetViewMode";
import { getLineMinutes } from "#modules/Timesheet/utilities/get-line-time";
import {
  getLinesTimeSum,
  getRunningTotal,
} from "#modules/Timesheet/utilities/sum-line-times";
import { useCategoryList } from "#hooks/query/useCategoryList";

export interface TimesheetRendererRowGroupProps {
  category?: CategoryRecord;
  lines?: TimesheetLineRecord[];
}

function TimesheetRendererCategoryRowGroup({
  category,
  lines,
}: TimesheetRendererRowGroupProps) {
  if (!category || !lines) {
    return <>Loading...</>;
  }

  return (
    <div className="timesheet-row-group categories">
      <Box component="header">
        <Text className="group-title">{category.name}</Text>
        <Box className="total-time">{getLinesTimeSum(lines)}</Box>
      </Box>
      <Box component="ul">
        {lines.map((line, index) => (
          <TimesheetRendererRow
            viewMode="by-category"
            key={line.id}
            row={line}
            runningTotal={getRunningTotal(lines.slice(0, index))}
          />
        ))}
      </Box>
    </div>
  );
}

function TimesheetRendererTimeRowGroup({
  lines,
}: TimesheetRendererRowGroupProps) {
  const categories = useCategoryList(true);

  if (!lines) {
    return <>Loading...</>;
  }

  return (
    <div className="timesheet-row-group time">
      <Box component="header">
        <Text className="group-title">Time</Text>
        <Box className="total-time">{getLinesTimeSum(lines)}</Box>
      </Box>
      <Box component="ul">
        {lines.map((line, index) => (
          <TimesheetRendererRow
            categories={categories.data}
            viewMode="by-time"
            key={line.id}
            row={line}
            runningTotal={getRunningTotal(lines.slice(0, index))}
          />
        ))}
      </Box>
    </div>
  );
}

export function TimesheetRendererRowGroup({
  viewMode,
  ...props
}: TimesheetRendererRowGroupProps & { viewMode: TimesheetViewMode }) {
  if (viewMode === "by-time") {
    return <TimesheetRendererTimeRowGroup {...props} />;
  }

  return <TimesheetRendererCategoryRowGroup {...props} />;
}
