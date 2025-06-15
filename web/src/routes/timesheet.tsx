import { TimesheetPage } from "#modules/Timesheet/pages/TimesheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheet")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TimesheetPage />;
}
