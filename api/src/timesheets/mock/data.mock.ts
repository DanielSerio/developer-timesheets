import { MockTimesheetLineProps } from "./timesheet-line.mock";
import { MockTimesheet, MockTimesheetProps } from "./timesheet.mock";

export type MockTimesheetLineParams = Omit<MockTimesheetLineProps, 'index' | 'timesheetId'>;

export const MOCK_TIMESHEET_LINES: MockTimesheetLineParams[] = [
  {
    categoryId: 4,
    startTime: '08:00',
    endTime: '08:45',
    note: null
  },
  {
    categoryId: 5,
    startTime: '08:45',
    endTime: '09:00',
    note: null
  },
  {
    categoryId: 4,
    startTime: '09:00',
    endTime: '9:45',
    note: 'Create components'
  },
  {
    categoryId: 4,
    startTime: '09:45',
    endTime: '11:00',
    note: null
  },
  {
    categoryId: 5,
    startTime: '11:00',
    endTime: '12:00',
    note: 'Associate assistance meeting'
  },
  {
    categoryId: 8,
    startTime: '13:00',
    endTime: '13:45',
    note: 'Testing created components'
  },
  {
    categoryId: 4,
    startTime: '13:45',
    endTime: '17:00',
    note: 'Bugfixes'
  },
];


export const MOCK_TIMESHEETS: MockTimesheet[] = [...new Array(28)].map((_, i) => new MockTimesheet({ index: i }));