import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetLineDto } from './create-timesheet-line.dto';

export class UpdateTimesheetLineDto extends PartialType(CreateTimesheetLineDto) { }
