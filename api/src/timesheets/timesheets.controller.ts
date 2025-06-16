import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { MockableController } from '../shared/mockable.controller';
import { Mockable } from '../shared/mockable.decorator';
import { MOCK_TIMESHEETS } from './mock/data.mock';
import { MockTimesheet } from './mock/timesheet.mock';
import { TimesheetBody, TimesheetCreate } from '#types/entity/timesheet.types';
import { DeleteResult } from 'typeorm';
import { DateRange, Pretty } from '#types/utility';
import { eachDayOfInterval } from 'date-fns';

@Controller('timesheets')
export class TimesheetsController extends MockableController {
  constructor(private readonly timesheetsService: TimesheetsService) {
    super();
  }

  private getDateRange(range?: string): DateRange | null {
    if (!range || range.trim().length === 0) {
      return null;
    }

    const fromTo = range.split(/[,]/g);

    const toDate = (value: string) => new Date(Date.parse(value));

    if (fromTo.length === 1) {
      return {
        from: null,
        to: toDate(fromTo[0])
      };
    }

    const [from, to] = fromTo;

    return {
      from: toDate(from),
      to: toDate(to)
    };
  }

  private handleMockGetMany(range?: string) {
    const dateRange = this.getDateRange(range);

    if (!dateRange) {
      return this.simulateResponse(() => MOCK_TIMESHEETS);
    }

    const allDays = eachDayOfInterval({ start: dateRange.from ?? dateRange.to, end: dateRange.to });
    const randomDay = () => allDays[~~(Math.random() * allDays.length)];

    return this.simulateResponse(() => {

      return MOCK_TIMESHEETS
        .map((sheet) => ({ ...sheet, date: randomDay() }))
        .sort((a, b) => a.date.toDateString().localeCompare(b.date.toDateString()));
    });
  }

  private handleMockGetOne(id: number) {
    return this.simulateResponse(() => {
      const found = MOCK_TIMESHEETS[id] ?? null;

      if (found === null) {
        throw new NotFoundException();
      }

      return found;
    });
  }

  private handleMockCreate(create: TimesheetCreate) {
    const nextId = MOCK_TIMESHEETS.length;

    return this.simulateResponse(() => {
      const created = new MockTimesheet({ index: nextId });

      created.name = create.name;
      created.date = create.date;

      return created;
    });
  }

  private async handleMockUpdate(id: number, update: Partial<Omit<TimesheetBody, 'id'>>) {
    const found = await this.handleMockGetOne(id);

    Object.assign(found, update);

    return found;
  }

  private async handleMockDelete(id: number) {
    await this.handleMockGetOne(id);

    type Res = Pretty<DeleteResult>;

    return {
      raw: '',
      affected: 1
    } satisfies Res;
  }

  @Post()
  create(
    @Mockable() mock: boolean,
    @Body() createTimesheetDto: CreateTimesheetDto
  ) {
    if (mock) {
      return this.handleMockCreate(createTimesheetDto);
    }

    return this.timesheetsService.create(createTimesheetDto);
  }

  @Get()
  findAll(
    @Mockable() mock: boolean,
    @Query('range') range?: string
  ) {
    if (mock) {
      return this.handleMockGetMany(range);
    }

    return this.timesheetsService.findAll();
  }

  @Get(':id')
  findOne(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    if (mock) {
      return this.handleMockGetOne(+id);
    }

    return this.timesheetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Mockable() mock: boolean,
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto
  ) {
    if (mock) {
      return this.handleMockUpdate(+id, updateTimesheetDto);
    }

    return this.timesheetsService.update(+id, updateTimesheetDto);
  }

  @Delete(':id')
  remove(
    @Mockable() mock: boolean,
    @Param('id') id: string
  ) {
    if (mock) {
      return this.handleMockDelete(+id);
    }

    return this.timesheetsService.remove(+id);
  }
}
