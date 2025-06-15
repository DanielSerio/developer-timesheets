import { TimesheetLineCreate, TimesheetLineRecord } from "#types/entity/timesheet.types";

export interface MockTimesheetLineProps extends TimesheetLineCreate {
  index: number;
}

export class MockTimesheetLine implements TimesheetLineRecord {
  id: number;
  timesheetId: number;
  categoryId: number;
  startTime: string;
  endTime: string;
  note: string | null = null;

  constructor({ index, ...props }: MockTimesheetLineProps) {
    const { timesheetId, categoryId, startTime, endTime, note } = props;

    this.id = index + 1;
    this.timesheetId = timesheetId;
    this.categoryId = categoryId;
    this.startTime = startTime;
    this.endTime = endTime;

    if (note) {
      this.note = note;
    }
  }
}