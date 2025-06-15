import { FlexTable } from "#modules/Core/components/FlexTable/FlexTable";
import { Page } from "#modules/Core/components/Page";
import { useState } from "react";
import { getCategoryColumns } from "../config/columns.config";
import { useCategories } from "../hooks/useCategories";
import { useCategoriesTable } from "../hooks/useCategoriesTable";
import type { CategoryRecord } from "#types/entity/category.types";
import { TbLock, TbLockOpen, TbPlus, TbTrash } from "react-icons/tb";
import { ActionIcon, Button, Group, Text } from "@mantine/core";

export function CategoryListPage() {
  const launchEdit = (record: CategoryRecord) => alert(JSON.stringify(record));
  const [rowSelection, setRowSelection] = useState({});

  const CATEGORY_COLUMNS = getCategoryColumns({
    launchEdit,
    breakpoint: "lg",
  });
  const [{ list }] = useCategories();
  const editModeController = useState(false);
  const [isEditMode, setIsEditMode] = editModeController;
  const table = useCategoriesTable({
    query: list,
    controller: editModeController,
    columns: CATEGORY_COLUMNS,
    rowSelection,
    setRowSelection,
  });

  //TODO:
  // * Create modal
  // * Edit/delete modal

  const toggle = () => {
    setIsEditMode((value) => {
      const nextValue = !value;

      if (nextValue) {
        setRowSelection({});
      }

      return nextValue;
    });
  };

  return (
    <Page>
      <FlexTable
        editModeController={editModeController}
        columns={CATEGORY_COLUMNS}
        table={table}
        isLoading={list.isLoading}
      >
        <Group h="100%" justify="flex-end" pr="sm">
          <ActionIcon
            variant="subtle"
            color={isEditMode ? "teal" : "dark"}
            onClick={() => toggle()}
          >
            {isEditMode ? <TbLockOpen /> : <TbLock />}
          </ActionIcon>
          {!!isEditMode && (
            <>
              {Object.keys(rowSelection).length > 0 && (
                <Button
                  variant="light"
                  color="red"
                  size="xs"
                  rightSection={<TbTrash />}
                >
                  <Text size="xs">Delete Categories</Text>
                </Button>
              )}
              <Button
                variant="light"
                color="blue"
                size="xs"
                rightSection={<TbPlus />}
              >
                <Text size="xs">Create Category</Text>
              </Button>
            </>
          )}
        </Group>
      </FlexTable>
    </Page>
  );
}
