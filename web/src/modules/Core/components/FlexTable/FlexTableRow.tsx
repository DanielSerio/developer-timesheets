import { classNames } from "#modules/Core/utilities/class-name";
import { Box, Flex, type MantineBreakpoint } from "@mantine/core";
import type { PropsWithChildren } from "react";

export type FlexTableRowProps = PropsWithChildren<{
  gridTemplateColumns: string;
  breakpoint: MantineBreakpoint;
  greenrow?: boolean;
}>;

export function FlexTableRow({
  gridTemplateColumns,
  breakpoint,
  children,
  greenrow,
}: FlexTableRowProps) {
  return (
    <>
      <Flex
        className={classNames([
          "table-row mobile",
          greenrow ? "greenrow" : null,
        ])}
        direction="column"
        hiddenFrom={breakpoint}
      >
        {children}
      </Flex>
      <Box
        className={classNames(["table-row", greenrow ? "greenrow" : null])}
        visibleFrom={breakpoint}
        style={{ gridTemplateColumns }}
      >
        {children}
      </Box>
    </>
  );
}
