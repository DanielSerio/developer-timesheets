import { FlexTable } from "#modules/Core/components/FlexTable/FlexTable";
import { Page } from "#modules/Core/components/Page";
import { useState } from "react";
import { getCategoryColumns } from "../config/columns.config";
import { useCategories } from "../hooks/useCategories";
import { useCategoriesTable } from "../hooks/useCategoriesTable";
import type { CategoryRecord } from "#types/entity/category.types";

export function CategoryListPage() {
  const launchEdit = (record: CategoryRecord) => alert(JSON.stringify(record));
  const [rowSelection, setRowSelection] = useState({});

  const CATEGORY_COLUMNS = getCategoryColumns({
    launchEdit,
  });
  const [{ list }] = useCategories();
  const editModeController = useState(false);
  const table = useCategoriesTable({
    query: list,
    controller: editModeController,
    columns: CATEGORY_COLUMNS,
    rowSelection,
    setRowSelection,
  });

  const toggle = () => editModeController[1]((value) => !value);

  return (
    <Page>
      <button onClick={() => toggle()}>Edit</button>
      <FlexTable
        editModeController={editModeController}
        columns={CATEGORY_COLUMNS}
        table={table}
        isLoading={list.isLoading}
      />
    </Page>
  );
}
