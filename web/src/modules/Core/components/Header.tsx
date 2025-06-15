import { AppShellHeader, Flex, Text } from "@mantine/core";
import { Navigation } from "./Navigation";

export const HEADER_HEIGHT = 48;

export function Header() {
  return (
    <>
      <AppShellHeader visibleFrom="xs" h={HEADER_HEIGHT}>
        <Flex component="header" direction="column" wrap="wrap">
          <Flex align="center" justify="space-between" px="sm">
            <Text>Timesheets</Text>

            <Navigation />
          </Flex>
        </Flex>
      </AppShellHeader>
      {/* Small Screens */}
      <AppShellHeader hiddenFrom="xs">
        <Flex component="header" direction="column">
          <Flex
            align="center"
            justify="space-between"
            direction="column"
            px="sm"
          >
            <Flex h={HEADER_HEIGHT} align="center">
              <Text>Timesheets</Text>
            </Flex>

            <Navigation />
          </Flex>
        </Flex>
      </AppShellHeader>
    </>
  );
}
