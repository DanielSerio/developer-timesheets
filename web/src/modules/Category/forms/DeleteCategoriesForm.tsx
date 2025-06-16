import { CancelButton } from "#modules/Core/components/buttons/CancelButton";
import { DestructiveButton } from "#modules/Core/components/buttons/DestructiveButton";
import type { CategoryRecord } from "#types/entity/category.types";
import { Group } from "@mantine/core";

export interface DeleteCategoriesFormProps {
  rowSelection: Record<number, boolean>;
  rows: CategoryRecord[];
  isBusy: boolean;
  onSubmit: () => Promise<void>;
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
  isBusy,
  onClose,
  onSubmit,
  ...props
}: DeleteCategoriesFormProps) {
  const rows = getFilteredRows(props);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <p>Are you sure you wish to delete the following categories?</p>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>{row.name}</li>
        ))}
      </ul>

      <Group component="footer" justify="flex-end" mt="md">
        <CancelButton disabled={isBusy} onClick={onClose} />
        <DestructiveButton isBusy={isBusy} />
      </Group>
    </form>
  );
}
