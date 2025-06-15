import { TimesheetListPage } from "#modules/Timesheet/pages/TimesheetListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <TimesheetListPage />;
}
