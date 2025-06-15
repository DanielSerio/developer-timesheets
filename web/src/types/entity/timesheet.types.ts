import type { Pretty } from "#types/utility";
import type { EntityBase } from "./base.types";

interface TimesheetRecordBasis extends EntityBase {
  name: string | null;
  date: Date | null;
}

interface TimesheetRecordBase extends TimesheetRecordBasis {
  name: string;
  date: Date;
}

interface TimesheetLineBasis {
  id: number | null;
  timesheetId: number | null;
  categoryId: number | null;
  startTime: string | null;
  endTime: string | null;
  note: string | null;
}

export type EmptyTimesheetLine = Pretty<TimesheetLineBasis>;

interface TimesheetLineRecordBase extends TimesheetLineBasis {
  id: number;
  timesheetId: number;
  categoryId: number;
  startTime: string;
  endTime: string;
}

export type TimesheetLineCreate = Pretty<Omit<TimesheetLineRecordBase, 'id'>>;
export type TimesheetLineBody = Pretty<TimesheetLineRecordBase>;
export type TimesheetLineRecord = Pretty<TimesheetLineRecordBase>;

export type EmptyTimesheet = Pretty<Pick<TimesheetRecordBasis, 'name' | 'date'>>;
export type TimesheetCreate = Pretty<Pick<TimesheetRecordBase, 'name' | 'date'>>;
export type TimesheetBody = Pretty<Pick<TimesheetRecordBase, 'name' | 'date' | 'id'>>;
export type TimesheetRecord = Pretty<TimesheetRecordBase>;

export type ExtendedTimesheetCreate = Pretty<TimesheetCreate & {
  Lines?: TimesheetLineCreate[];
}>;

export type ExtendedTimesheetBody = Pretty<TimesheetBody & {
  deleteLineIds?: number[];
  Lines?: (TimesheetLineCreate | TimesheetLineBody)[];
}>;

export type ExtendedTimesheetRecord = Pretty<TimesheetRecord & {
  Lines?: TimesheetLineRecord[];
}>;