import { Page } from "#modules/Core/components/Page";
import { Button, Flex, Group, Radio, Switch, TextInput } from "@mantine/core";
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
      <Flex justify="space-between" wrap={"wrap"}>
        <div>
          <TextInput readOnly={!isEditMode} value={query.data?.name} />
        </div>
        <Group wrap="wrap">
          <Switch
            label="Edit Mode"
            checked={isEditMode}
            onChange={(ev) => {
              console.info(ev);
              setIsEditMode(ev.currentTarget.checked);
            }}
          />
          <Group>
            <Radio
              disabled={isEditMode}
              value="by-time"
              label="Time"
              checked={viewMode === "by-time"}
              onChange={() => setViewMode("by-time")}
            />
            <Radio
              disabled={isEditMode}
              value="by-category"
              label="Category"
              checked={viewMode === "by-category"}
              onChange={() => setViewMode("by-category")}
            ></Radio>
          </Group>
          <Button color="red" disabled={!isEditMode}>
            Delete Timesheet
          </Button>
        </Group>
      </Flex>
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
