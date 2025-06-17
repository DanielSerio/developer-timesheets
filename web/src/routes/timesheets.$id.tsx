import { TimesheetPage } from "#modules/Timesheet/pages/TimesheetPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import "#styles/output/timesheet.scss";

export const Route = createFileRoute("/timesheets/$id")({
  beforeLoad(ctx) {
    if (isNaN(+ctx.params.id)) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const timesheetId = +params.id;

  return <TimesheetPage timesheetId={timesheetId} />;
}
