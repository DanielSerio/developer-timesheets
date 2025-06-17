import { Page } from "#modules/Core/components/Page";
import { Button, Radio, RadioGroup, Switch, TextInput } from "@mantine/core";
import { useTimesheetPage } from "../hooks/useTimesheetPage";
import type { TimesheetViewMode } from "../hooks/useTimesheetViewMode";
import { TimesheetRenderer } from "../components/TimesheetRenderer/TimesheetRenderer";

export interface TimesheetPageProps {
  timesheetId: number;
  defaultViewMode?: TimesheetViewMode;
}

export function TimesheetPage({
  timesheetId,
  defaultViewMode,
}: TimesheetPageProps) {
  const { query, editModeController, viewModeController } = useTimesheetPage({
    timesheetId,
    defaultViewMode,
  });
  const [isEditMode, setIsEditMode] = editModeController;
  const [viewMode, _toggle, setViewMode] = viewModeController;
  return (
    <Page>
      <div>
        <Switch
          label="Edit Mode"
          checked={isEditMode}
          onChange={(ev) => {
            console.info(ev);
            setIsEditMode(ev.currentTarget.checked);
          }}
        />
        <RadioGroup
          value={viewMode}
          onChange={(value) => setViewMode(value as TimesheetViewMode)}
        >
          <Radio disabled={!isEditMode} value="by-time" label="Time" />
          <Radio disabled={!isEditMode} value="by-category" label="Category" />
        </RadioGroup>
        <Button color="red" disabled={!isEditMode}>
          Delete Timesheet
        </Button>
        <div>
          <TextInput readOnly={!isEditMode} value={query.data?.name} />
        </div>
      </div>
      <div>
        <TimesheetRenderer
          viewMode={viewMode}
          date={query.data?.date}
          lines={query.data?.Lines}
        />
      </div>
    </Page>
  );
}
