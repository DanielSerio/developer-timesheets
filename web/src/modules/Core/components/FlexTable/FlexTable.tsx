import { Box, Flex, type MantineBreakpoint } from "@mantine/core";
import { flexRender, type ColumnDef, type Table } from "@tanstack/react-table";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { FlexTableRow, FlexTableSkeletonRow } from "./FlexTableRow";
import { FlexTableCell, FlexTableHeadCell } from "./FlexTableCell";

export type FlexTableColumnConfig<T, TV = unknown> = ColumnDef<T, TV> & {
  id: string;
  size: number;
};

export interface FlexTableProps<T, TV = unknown> extends PropsWithChildren<{}> {
  columns: FlexTableColumnConfig<T, TV>[];
  isLoading?: boolean;
  table: Table<T>;
  breakpoint?: MantineBreakpoint;
  editModeController: [boolean, Dispatch<SetStateAction<boolean>>];
}

function FlexTableBody({ children }: PropsWithChildren) {
  return (
    <Flex className="table-body" direction="column">
      {children}
    </Flex>
  );
}

function FlexTableHeader({
  children,
  breakpoint,
}: PropsWithChildren<{ breakpoint?: MantineBreakpoint }>) {
  return (
    <Flex component="header" className="table-header" visibleFrom={breakpoint}>
      {children}
    </Flex>
  );
}

function getGridProfile<T, TV = unknown>(
  columns: FlexTableColumnConfig<T, TV>[]
) {
  const copy = columns.slice();
  const total = copy.reduce((sum, col) => sum + col.size, 0);

  return copy
    .map((col) => `${((col.size / total) * 100).toPrecision(3)}%`)
    .join(" ");
}

function FlexTableBase<T, TV = unknown>({
  columns,
  table,
  isLoading,
  breakpoint,
  children,
}: FlexTableProps<T, TV>) {
  const gridTemplateColumns = getGridProfile<T, TV>(
    columns.filter((val) =>
      table.getVisibleFlatColumns().some((col) => col.id === val.id)
    )
  );

  return (
    <Box className="table-wrapper">
      {!!children && <Box className="table-toolbar">{children}</Box>}
      <Flex direction="column" className="table-root">
        <FlexTableHeader breakpoint={breakpoint ?? "lg"}>
          <FlexTableRow
            breakpoint={breakpoint ?? "lg"}
            gridTemplateColumns={gridTemplateColumns}
          >
            {table.getFlatHeaders().map((header) => {
              return (
                <FlexTableHeadCell
                  key={header.id}
                  align={
                    (header.column.columnDef.meta as Record<string, any>)
                      ?.textAlign
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </FlexTableHeadCell>
              );
            })}
          </FlexTableRow>
        </FlexTableHeader>
        <FlexTableBody>
          {isLoading &&
            [...new Array(9)].map((_, index) => (
              <FlexTableSkeletonRow
                key={index}
                breakpoint={breakpoint ?? "lg"}
                gridTemplateColumns={gridTemplateColumns}
                greenrow={index % 2 === 0}
                columnCount={4}
              />
            ))}
          {table.getCoreRowModel().flatRows.map((row, index) => {
            return (
              <FlexTableRow
                key={row.id}
                isSelected={row.getIsSelected()}
                breakpoint={breakpoint ?? "lg"}
                gridTemplateColumns={gridTemplateColumns}
                greenrow={index % 2 === 0}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <FlexTableCell
                      key={cell.id}
                      align={
                        (cell.column.columnDef.meta as Record<string, any>)
                          ?.textAlign
                      }
                      label={cell.column.columnDef.header as string}
                      breakpoint={breakpoint ?? "lg"}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </FlexTableCell>
                  );
                })}
              </FlexTableRow>
            );
          })}
        </FlexTableBody>
      </Flex>
    </Box>
  );
}

FlexTableBase.Header = FlexTableHeader;
FlexTableBase.Body = FlexTableBody;

export const FlexTable = FlexTableBase;
