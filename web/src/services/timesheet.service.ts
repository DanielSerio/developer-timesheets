import { ClientService } from "./client.service";
import type { ExtendedTimesheetBody, ExtendedTimesheetCreate, ExtendedTimesheetRecord, TimesheetRecord } from "#types/entity/timesheet.types";
import type { DateRange } from "#hooks/query/useTimesheetList";

class TimesheetClientService extends ClientService<ExtendedTimesheetRecord, ExtendedTimesheetCreate, ExtendedTimesheetBody> {

  private dateStamp = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  private getRangeString = (range: DateRange) => {
    if (range.from && range.to) {
      return `${this.dateStamp(range.from)},${this.dateStamp(range.to)}`;
    }

    return `${this.dateStamp(range.to)}`;
  };

  public async listForRange(range: DateRange, mock?: boolean) {
    const sp = new URLSearchParams({
      mock: mock ? 'true' : '',
      range: range ? this.getRangeString(range) : ''
    });


    const URL = `${this.URL}?${sp.toString()}`;

    const response = await fetch(URL, {
      ...this.DEFAULT_OPTIONS,
      method: 'GET',
    });

    return await response.json() as TimesheetRecord[];
  }
}

export const TimesheetService = new TimesheetClientService('/timesheets');