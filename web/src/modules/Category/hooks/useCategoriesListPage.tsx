import { useState } from "react";
import type { CategoryRecord } from "#types/entity/category.types";
import { getCategoryColumns } from "../config/columns.config";
import { useCategories } from "./useCategories";
import { useCategoriesTable } from "./useCategoriesTable";

export function useCategoriesListPage() {
  const [modalState, setModalState] = useState<
    | null
    | {
        context: "create" | "update";
        record: null | CategoryRecord;
      }
    | {
        context: "delete";
      }
  >(null);
  const launchCreate = () => setModalState({ record: null, context: "create" });
  const launchEdit = (record: CategoryRecord) =>
    setModalState({ record, context: "update" });

  const launchDeleteModal = () =>
    setModalState({
      context: "delete",
    });

  const dismissModal = () => setModalState(null);

  const rowSelectionController = useState({});
  const [rowSelection, setRowSelection] = rowSelectionController;

  const CATEGORY_COLUMNS = getCategoryColumns({
    launchEdit,
    breakpoint: "lg",
  });
  const categoriesController = useCategories();
  const [{ list }] = categoriesController;
  const editModeController = useState(false);
  const [_, setIsEditMode] = editModeController;
  const table = useCategoriesTable({
    query: list,
    controller: editModeController,
    columns: CATEGORY_COLUMNS,
    rowSelection,
    setRowSelection,
  });

  const toggleEditMode = () => {
    setIsEditMode((value) => {
      const nextValue = !value;

      if (nextValue) {
        setRowSelection({});
      }

      return nextValue;
    });
  };

  return {
    table,
    editModeController,
    categoriesController,
    rowSelectionController,
    columns: CATEGORY_COLUMNS,
    modalState,
    modalController: {
      launchCreateModal: launchCreate,
      launchEditModal: launchEdit,
      launchDeleteModal,
      dismissModal,
    },
    toggleEditMode,
  };
}
