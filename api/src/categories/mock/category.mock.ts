import { CategoryCreate, CategoryRecord } from "src/types/entity/category.types";

export class MockCategory implements CategoryRecord {
  public id: number;
  public name: string;
  public createdAt: Date = new Date();
  public lastUpdatedAt: Date | null = null;

  constructor({ name, index }: CategoryCreate & { index: number; }) {
    this.name = name;
    this.id = index + 1;
  }
}