import { TimesheetCreate, TimesheetRecord } from "#types/entity/timesheet.types";
import { MOCK_TIMESHEET_LINES } from "./data.mock";
import { MockTimesheetLine, MockTimesheetLineProps } from "./timesheet-line.mock";

export interface MockTimesheetProps {
  index: number;
}

export class MockTimesheet implements TimesheetRecord {
  id: number;
  name: string;
  date: Date;
  createdAt: Date = new Date();
  lastUpdatedAt: Date | null = null;

  Lines: MockTimesheetLine[];

  constructor({ index }: MockTimesheetProps) {
    this.id = index + 1;
    this.onInit(index);
  }

  private createDateStringFromIndex(index: number) {
    return `2025-05-${`${index + 1}`.padStart(2, '0')}`;
  }

  private onInit(index: number) {
    const date = new Date(`${this.createDateStringFromIndex(index)} 00:00:00.000`);

    this.setProperties({
      name: `Timesheet ${date.toLocaleDateString()}`,
      date
    });
    this.createLines();
  }

  private setProperties(create: TimesheetCreate) {
    this.name = create.name;
    this.date = create.date;
  }

  private createLines() {
    this.Lines = MOCK_TIMESHEET_LINES.map((params, index) => this.createLine({
      index,
      timesheetId: this.id,
      ...params,
    }));
  }

  private createLine(props: MockTimesheetLineProps) {
    return new MockTimesheetLine(props);
  }
}