import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
  );
}
