import { FlexTable } from "#modules/Core/components/FlexTable/FlexTable";
import { Page } from "#modules/Core/components/Page";
import { useTimesheetListPage } from "../hooks/useTimesheetListPage";

const defaultRange = {
  from: null,
  to: new Date(),
};

export function TimesheetListPage() {
  console.info("TimesheetListPage", defaultRange);
  const {
    editModeController,
    table,
    query: list,
    columns,
  } = useTimesheetListPage({
    range: defaultRange,
  });

  console.info(table.getCoreRowModel());

  return (
    <Page>
      <FlexTable
        editModeController={editModeController}
        columns={columns}
        table={table}
        isLoading={list.isLoading}
      ></FlexTable>
    </Page>
  );
}
