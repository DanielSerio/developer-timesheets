import { Box, Flex } from "@mantine/core";
import { type PropsWithChildren } from "react";

export function FlexTableHeadCell({ children }: PropsWithChildren) {
  return (
    <Flex className="head-cell">
      <Box>{children}</Box>
    </Flex>
  );
}

export function FlexTableCell({ children }: PropsWithChildren) {
  return (
    <Flex className="cell">
      <Box>{children}</Box>
    </Flex>
  );
}
