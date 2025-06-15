import { Box, Flex, Text, type MantineBreakpoint } from "@mantine/core";
import { type PropsWithChildren } from "react";

export function FlexTableHeadCell({
  children,
  align,
}: PropsWithChildren<{ align?: "center" }>) {
  return (
    <Flex
      className="head-cell"
      flex={1}
      w="100%"
      style={align ? { textAlign: align } : undefined}
    >
      <Box>{children}</Box>
    </Flex>
  );
}

export function FlexTableCell({
  label,
  breakpoint,
  children,
  align,
}: PropsWithChildren<{
  label: string;
  breakpoint: MantineBreakpoint;
  align?: "center";
}>) {
  return (
    <Flex
      className="cell"
      justify="space-between"
      flex={1}
      style={align ? { textAlign: align } : undefined}
    >
      <Box hiddenFrom={breakpoint}>
        <Text fz={14} style={{ textAlign: "left" }}>
          {label}
        </Text>
      </Box>
      <Box hiddenFrom={breakpoint} w="100%" style={{ textAlign: "right" }}>
        {children}
      </Box>
      <Box visibleFrom={breakpoint}>{children}</Box>
    </Flex>
  );
}
