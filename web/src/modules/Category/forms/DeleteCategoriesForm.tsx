import { CancelButton } from "#modules/Core/components/buttons/CancelButton";
import { DestructiveButton } from "#modules/Core/components/buttons/DestructiveButton";
import type { CategoryRecord } from "#types/entity/category.types";
import { Group } from "@mantine/core";

export interface DeleteCategoriesFormProps {
  rowSelection: Record<number, boolean>;
  rows: CategoryRecord[];
  onClose: () => void;
}

function getFilteredRows({
  rows,
  rowSelection,
}: Pick<DeleteCategoriesFormProps, "rows" | "rowSelection">) {
  const filtered = [];

  for (const key in rowSelection) {
    if (rowSelection[key]) {
      filtered.push(rows[+key]);
    }
  }

  return filtered;
}

export function DeleteCategoriesForm({
  onClose,
  ...props
}: DeleteCategoriesFormProps) {
  const rows = getFilteredRows(props);

  return (
    <form>
      <p>Are you sure you wish to delete the following categories?</p>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>{row.name}</li>
        ))}
      </ul>

      <Group component="footer" justify="flex-end" mt="md">
        <CancelButton onClick={onClose} />
        <DestructiveButton />
      </Group>
    </form>
  );
}
