import { Page } from "#modules/Core/components/Page";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Flex,
  Group,
  Radio,
  Switch,
  TextInput,
} from "@mantine/core";
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
      <div className="timesheet-header">
        <Flex justify="space-between" wrap="wrap">
          <Group className="header-group" justify="space-between">
            <Breadcrumbs separator="→">
              <Anchor href={"/"}>Timesheet</Anchor>
              <Anchor href={`/timesheets/${timesheetId}`}>{timesheetId}</Anchor>
            </Breadcrumbs>

            <TextInput readOnly={!isEditMode} value={query.data?.name} />
          </Group>

          <Group className="toolbar-group" wrap="wrap">
            <Switch
              label="Edit Mode"
              checked={isEditMode}
              onChange={(ev) => {
                console.info(ev);
                setIsEditMode(ev.currentTarget.checked);
              }}
            />
            <Group flex={1}>
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
