import { Checkbox, Flex, type MantineBreakpoint } from "@mantine/core";
import type { ReactNode } from "@tanstack/react-router";
import { formatDistance } from "date-fns";
import type { FlexTableColumnConfig } from "#modules/Core/components/FlexTable/FlexTable";
import type { CategoryRecord } from "#types/entity/category.types";

export interface GetCategoryColumnsProps {
  breakpoint: MantineBreakpoint;
  launchEdit: (record: CategoryRecord) => void;
}

export function getCategoryColumns({
  breakpoint,
  launchEdit,
}: GetCategoryColumnsProps) {
  return [
    {
      id: "selected",
      size: 60,
      meta: {
        textAlign: "center",
      },
      header: ({ table }) => (
        <Flex
          className="py-1"
          align="center"
          justify="center"
          w="100%"
          h="100%"
        >
          <Checkbox
            size="xs"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </Flex>
      ),
      cell: ({ row }) => (
        <>
          <Flex
            className="py-1"
            align="center"
            justify="flex-end"
            hiddenFrom={breakpoint}
            w="100%"
            h="100%"
          >
            <Checkbox
              size="xs"
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </Flex>
          <Flex
            className="py-1"
            align="center"
            justify="center"
            visibleFrom={breakpoint}
            w="100%"
            h="100%"
          >
            <Checkbox
              size="xs"
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </Flex>
        </>
      ),
    },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      size: 40,
      meta: {
        textAlign: "center",
      },
    },
    {
      id: "name",
      header: "Name",
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
      header: "Created",
      accessorKey: "createdAt",
      size: 140,
      cell({ row }) {
        const { createdAt } = row.original;
        const nowDate = new Date()
          .toISOString()
          .replace("T", " ")
          .replace(/Z$/, "");
        const stamp = `${nowDate}`;
        const createdStamp = `${`${createdAt}`.replace("T", " ")}`.replace(
          /Z$/,
          ""
        );

        const formattedTimeDistance = formatDistance(createdStamp, stamp, {
          addSuffix: true,
        });

        return <span title={createdStamp}>{formattedTimeDistance}</span>;
      },
    },
    {
      id: "lastUpdatedAt",
      header: "Updated",
      accessorKey: "lastUpdatedAt",
      size: 140,
    },
  ] satisfies FlexTableColumnConfig<CategoryRecord>[];
}
