import {
  useTimesheetList,
  type DateRange,
} from "#hooks/query/useTimesheetList";
import type { FlexTableColumnConfig } from "#modules/Core/components/FlexTable/FlexTable";
import type { TimesheetRecord } from "#types/entity/timesheet.types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

const columns: FlexTableColumnConfig<TimesheetRecord>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
    size: 40,
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    size: 280,
    cell: ({ row }) => (
      <a href={`/timesheets/${row.original.id}`}>{row.original.name}</a>
    ),
  },
];

const data = [] as TimesheetRecord[];

export function useTimesheetListPage({ range }: { range?: DateRange }) {
  const editModeController = useState(false);
  const query = useTimesheetList(range, true);
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data: query.data ?? data,
  });

  return {
    editModeController,
    table,
    columns,
    query,
  };
}
