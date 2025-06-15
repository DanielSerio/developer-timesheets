import { ClientService } from "./client.service";
import type { ExtendedTimesheetBody, ExtendedTimesheetCreate, ExtendedTimesheetRecord } from "#types/entity/timesheet.types";

class TimesheetClientService extends ClientService<ExtendedTimesheetRecord, ExtendedTimesheetCreate, ExtendedTimesheetBody> { }

export const TimesheetService = new TimesheetClientService('/timesheets');