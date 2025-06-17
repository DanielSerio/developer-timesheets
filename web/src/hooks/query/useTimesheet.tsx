import { QUERY_KEYS } from "#const/query-client";
import { TimesheetService } from "#services/timesheet.service";
import { useQuery } from "@tanstack/react-query";

export function useTimesheet(id?: number, mock?: boolean) {
  return useQuery({
    enabled: !!id,
    queryKey: [...QUERY_KEYS.timesheets.find, id, `mock=${mock ?? true}`],
    async queryFn() {
      if (!id) {
        return null;
      }

      return await TimesheetService.find(id!, mock);
    },
  });
}
