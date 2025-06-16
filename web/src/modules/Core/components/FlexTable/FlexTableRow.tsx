import { classNames } from "#modules/Core/utilities/class-name";
import { Box, Flex, Skeleton, type MantineBreakpoint } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { FlexTableCell } from "./FlexTableCell";

type RowPropsBasis = {
  gridTemplateColumns: string;
  breakpoint: MantineBreakpoint;
  greenrow?: boolean;
};

export type FlexTableSkeletonRowProps = RowPropsBasis & { columnCount: number };

export type FlexTableRowProps = PropsWithChildren<
  RowPropsBasis & {
    isSelected?: boolean;
  }
>;

export function FlexTableRow({
  gridTemplateColumns,
  breakpoint,
  children,
  greenrow,
  isSelected,
}: FlexTableRowProps) {
  const classesProps = [
    "table-row",
    greenrow ? "greenrow" : null,
    isSelected ? "selected" : null,
  ];
  const classes = classNames(classesProps);
  const mobileClasses = classNames([...classesProps, "mobile"]);
  return (
    <>
      <Flex
        className={mobileClasses}
        direction="column"
        hiddenFrom={breakpoint}
      >
        {children}
      </Flex>
      <Box
        className={classes}
        visibleFrom={breakpoint}
        style={{ gridTemplateColumns }}
      >
        {children}
      </Box>
    </>
  );
}

const SkeletonColumns = ({
  count,
  breakpoint,
}: {
  count: number;
  breakpoint: MantineBreakpoint;
}) => {
  return [...new Array(count)].map((_, index) => {
    return (
      <FlexTableCell key={index} label="Loading..." breakpoint={breakpoint}>
        <Skeleton my={6} h={16} w={"100%"} />
      </FlexTableCell>
    );
  });
};

export function FlexTableSkeletonRow({
  gridTemplateColumns,
  greenrow,
  breakpoint,
  columnCount,
}: FlexTableSkeletonRowProps) {
  const classesProps = ["table-row", greenrow ? "greenrow" : null];
  const classes = classNames(classesProps);
  const mobileClasses = classNames([...classesProps, "mobile"]);

  return (
    <>
      <Flex
        className={mobileClasses}
        direction="column"
        hiddenFrom={breakpoint}
      >
        <SkeletonColumns count={columnCount} breakpoint={breakpoint} />
      </Flex>
      <Box
        className={classes}
        visibleFrom={breakpoint}
        style={{ gridTemplateColumns }}
      >
        <SkeletonColumns count={columnCount} breakpoint={breakpoint} />
      </Box>
    </>
  );
}
