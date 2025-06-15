import type { Pretty } from "#types/utility";
import type { EntityBase } from "./base.types";

interface CategoryRecordBase extends EntityBase {
  name: string;
}

export type CategoryCreate = Pretty<Pick<CategoryRecordBase, 'name'>>;
export type CategoryBody = Pretty<Pick<CategoryRecordBase, 'name' | 'id'>>;
export type CategoryRecord = Pretty<CategoryRecordBase>;