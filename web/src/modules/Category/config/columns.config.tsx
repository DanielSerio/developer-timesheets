import type { FlexTableColumnConfig } from "#modules/Core/components/FlexTable/FlexTable";
import type { CategoryRecord } from "#types/entity/category.types";
import { Checkbox } from "@mantine/core";
import type { ReactNode } from "@tanstack/react-router";

export interface GetCategoryColumnsProps {
  launchEdit: (record: CategoryRecord) => void;
}

export function getCategoryColumns({ launchEdit }: GetCategoryColumnsProps) {
  return [
    {
      id: "selected",
      size: 40,
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      size: 40,
    },
    {
      id: "name",
      accessorKey: "name",
      size: 420,
      cell: (row) => {
        return (
          <button
            className="pseudo-link"
            disabled={
              !row.table
                .getVisibleFlatColumns()
                .some((col) => col.id === "selected")
            }
            onClick={() => launchEdit(row.row.original)}
          >
            {row.renderValue() as ReactNode}
          </button>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      size: 140,
    },
    {
      id: "lastUpdatedAt",
      accessorKey: "lastUpdatedAt",
      size: 140,
    },
  ] satisfies FlexTableColumnConfig<CategoryRecord>[];
}
