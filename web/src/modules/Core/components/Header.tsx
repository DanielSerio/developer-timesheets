import { AppShellHeader, Flex, Text } from "@mantine/core";
import { Navigation } from "./Navigation";

export const HEADER_HEIGHT = 48;

export function Header() {
  return (
    <AppShellHeader h={HEADER_HEIGHT}>
      <Flex component="header" direction="column">
        <Flex align="center" justify="space-between" px="sm">
          <Text>Timesheets</Text>

          <Navigation />
        </Flex>
      </Flex>
    </AppShellHeader>
  );
}
