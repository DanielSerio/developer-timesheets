import { TbLock, TbLockOpen, TbPlus, TbTrash } from "react-icons/tb";
import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FlexTable } from "#modules/Core/components/FlexTable/FlexTable";
import { Page } from "#modules/Core/components/Page";
import { CategoryForm } from "../forms/CategoryForm";
import { useCategoriesListPage } from "../hooks/useCategoriesListPage";
import { DeleteCategoriesForm } from "../forms/DeleteCategoriesForm";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "#const/query-client";

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
  const client = useQueryClient();
  const [{ list }, { create, update, delete: deleteMutation }] =
    categoriesController;
  const [isEditMode, setIsEditMode] = editModeController;
  const [rowSelection, setRowSelection] = rowSelectionController;

  const getSubmitFn = <TypeName extends "create" | "update">(
    mutation: TypeName extends "create" ? typeof create : typeof update,
    ctx: TypeName
  ) => {
    return async (values: Parameters<typeof mutation.mutateAsync>[0]) => {
      const notificationTitle =
        ctx === "create" ? "Created category" : "Updated Category";

      try {
        await mutation.mutateAsync(values as any);
        await client.invalidateQueries({
          queryKey: QUERY_KEYS.categories.list,
        });

        notifications.show({
          title: notificationTitle,
          message: `Successfully ${ctx}d category`,
          color: "green",
        });

        await dismissModal();
      } catch (err) {
        notifications.show({
          title: `Error ${ctx.replace(/e$/, "")}ing category`,
          message: `Could not ${ctx} category`,
          color: "red",
        });
      }
    };
  };

  const onCreateSubmit = getSubmitFn(create, "create");
  const onUpdateSubmit = getSubmitFn(update, "update");
  const onDeleteSubmit = async () => {
    try {
      const result = await deleteMutation.mutateAsync(
        Object.keys(rowSelection).map((n) => +n)
      );
      await client.invalidateQueries({
        queryKey: QUERY_KEYS.categories.list,
      });
      setRowSelection({});
      setIsEditMode(false);

      notifications.show({
        title: `Delete Categories`,
        message: [
          `Successfully deleted categories.`,
          `count: ${result.affected}`,
        ].join("  "),
        color: "green",
      });

      await dismissModal();
    } catch (err) {
      notifications.show({
        title: `Error deleteing categories`,
        message: [`Could not delete categories`, (err as Error).message].join(
          "  "
        ),
        color: "red",
      });
    }
  };

  const getTitle = () => {
    const action = modalState?.context;

    if (action) {
      const entitiyName = action === "delete" ? "Categoies" : "Category";
      const actionName = `${action[0].toUpperCase()}${action.slice(1)}`;

      return `${actionName} ${entitiyName}`;
    }

    return "";
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
            isBusy={deleteMutation.isPending}
            onSubmit={onDeleteSubmit}
            onClose={dismissModal}
          />
        ) : (
          <CategoryForm
            initialValue={modalState?.record ?? undefined}
            isBusy={create.isPending || update.isPending}
            onCreateSubmit={onCreateSubmit}
            onUpdateSubmit={onUpdateSubmit}
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
