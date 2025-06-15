import { TimesheetRecord } from "#types/entity/timesheet.types";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TimesheetLine } from "./timesheet-line.entity";

@Entity()
export class Timesheet implements TimesheetRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null
  })
  lastUpdatedAt: Date | null = null;

  @Column({
    type: 'varchar',
    length: 128,
    unique: true
  })
  name: string;

  @Column({
    type: 'date',
  })
  date: Date;

  @OneToMany(() => TimesheetLine, (line) => line.Timesheet)
  Lines?: TimesheetLine[];
}
