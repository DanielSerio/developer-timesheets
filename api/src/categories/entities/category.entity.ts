import { CategoryRecord } from "#types/entity/category.types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category implements CategoryRecord {
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
    length: 64,
    unique: true
  })
  name: string;
}
