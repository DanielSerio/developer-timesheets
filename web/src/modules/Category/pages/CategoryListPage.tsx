import { TbLock, TbLockOpen, TbPlus, TbTrash } from "react-icons/tb";
import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { FlexTable } from "#modules/Core/components/FlexTable/FlexTable";
import { Page } from "#modules/Core/components/Page";
import { CategoryForm } from "../forms/CategoryForm";
import { useCategoriesListPage } from "../hooks/useCategoriesListPage";
import { DeleteCategoriesForm } from "../forms/DeleteCategoriesForm";

export function CategoryListPage() {
  const {
    modalState,
    modalController: { launchCreateModal, launchDeleteModal, dismissModal },
    editModeController,
    categoriesController,
    rowSelectionController,
    table,
    columns,
    toggleEditMode,
  } = useCategoriesListPage();
  const [{ list }] = categoriesController;
  const [isEditMode] = editModeController;
  const [rowSelection] = rowSelectionController;

  const getTitle = () => {
    if (modalState?.context === "update") {
      return "Update Category";
    }

    if (modalState?.context === "delete") {
      return "Delete Categoies";
    }

    return "Create Category";
  };

  return (
    <>
      <Modal
        title={getTitle()}
        opened={modalState !== null && !!modalState.context}
        onClose={dismissModal}
      >
        {modalState?.context === "delete" ? (
          <DeleteCategoriesForm
            rowSelection={rowSelection}
            rows={list.data!}
            onClose={dismissModal}
          />
        ) : (
          <CategoryForm
            initialValue={modalState?.record ?? undefined}
            onClose={dismissModal}
          />
        )}
      </Modal>
      <Page>
        <FlexTable
          editModeController={editModeController}
          columns={columns}
          table={table}
          isLoading={list.isLoading}
        >
          <Group h="100%" justify="flex-end" pr="sm">
            <ActionIcon
              variant="subtle"
              color={isEditMode ? "teal" : "dark"}
              onClick={() => toggleEditMode()}
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
                    onClick={() => launchDeleteModal()}
                  >
                    <Text size="xs">Delete Categories</Text>
                  </Button>
                )}
                <Button
                  variant="light"
                  color="blue"
                  size="xs"
                  rightSection={<TbPlus />}
                  onClick={launchCreateModal}
                >
                  <Text size="xs">Create Category</Text>
                </Button>
              </>
            )}
          </Group>
        </FlexTable>
      </Page>
    </>
  );
}
