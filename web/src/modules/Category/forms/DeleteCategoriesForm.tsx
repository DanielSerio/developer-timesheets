import type { CategoryRecord } from "#types/entity/category.types";

export interface DeleteCategoriesFormProps {
  rowSelection: Record<number, boolean>;
  rows: CategoryRecord[];
}

function getFilteredRows({ rows, rowSelection }: DeleteCategoriesFormProps) {
  const filtered = [];

  for (const key in rowSelection) {
    if (rowSelection[key]) {
      filtered.push(rows[+key]);
    }
  }

  return filtered;
}

export function DeleteCategoriesForm(props: DeleteCategoriesFormProps) {
  return <div>{JSON.stringify(getFilteredRows(props))}</div>;
}
