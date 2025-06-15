import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { getCategoryColumns } from "../config/columns.config";
import type { CategoryRecord } from "#types/entity/category.types";
import type { useCategoryList } from "#hooks/query/useCategoryList";
import type { Dispatch, SetStateAction } from "react";

const DEFAULT_DATA = [] as CategoryRecord[];

export interface UseCategoriesTableProps {
  query: ReturnType<typeof useCategoryList>;
  controller: [boolean, Dispatch<SetStateAction<boolean>>];
  columns: ReturnType<typeof getCategoryColumns>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}

export function useCategoriesTable({
  query,
  controller,
  columns,
  rowSelection,
  setRowSelection,
}: UseCategoriesTableProps) {
  const CATEGORY_COLUMNS = columns;

  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    columns: CATEGORY_COLUMNS,
    data: query.data ?? DEFAULT_DATA,
    state: {
      rowSelection,
      columnVisibility: {
        selected: controller[0] === true,
        id: true,
        name: true,
        createdAt: true,
        lastUpdatedAt: true,
      },
    },
  });
}
