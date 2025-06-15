import { Page } from "#modules/Core/components/Page";

export interface TimesheetPageProps {
  timesheetId: number;
}

export function TimesheetPage({ timesheetId }: TimesheetPageProps) {
  return (
    <Page>
      <div>TimesheetPage {timesheetId}</div>
    </Page>
  );
}
