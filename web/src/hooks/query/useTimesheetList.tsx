import { QUERY_KEYS } from "#const/query-client";
import { TimesheetService } from "#services/timesheet.service";
import { useQuery } from "@tanstack/react-query";

export interface DateRange {
  from: Date | null;
  to: Date;
}

export function useTimesheetList(range?: DateRange, mock?: boolean) {
  console.info(range, mock, [
    ...QUERY_KEYS.timesheets.list,
    JSON.stringify(range),
    `mock=${mock ?? "false"}`,
  ]);
  return useQuery({
    enabled: !!range && !!range.to,
    queryKey: [
      ...QUERY_KEYS.timesheets.list,
      JSON.stringify(range),
      `mock=${mock ?? "false"}`,
    ],
    async queryFn() {
      if (!range) {
        return [];
      }

      return await TimesheetService.listForRange(range, mock);
    },
    staleTime: 60 * 1000 * 60 * 60,
  });
}
