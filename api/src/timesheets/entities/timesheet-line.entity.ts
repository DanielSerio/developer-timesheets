import { TimesheetLineRecord } from "#types/entity/timesheet.types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timesheet } from "./timesheet.entity";

@Entity()
export class TimesheetLine implements TimesheetLineRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  timesheetId: number;

  @Column({
    type: 'int',
  })
  categoryId: number;

  @Column({
    type: 'char',
    length: 5
  })
  startTime: string;

  @Column({
    type: 'char',
    length: 5
  })
  endTime: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  note: string | null = null;

  @ManyToOne(() => Timesheet)
  @JoinColumn({
    name: 'timesheetId',
    referencedColumnName: 'id'
  })
  Timesheet?: Timesheet;
}