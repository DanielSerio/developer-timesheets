import { type PropsWithChildren } from "react";
import { Notifications } from "@mantine/notifications";
import { QueryProvider } from "./query.provider";
import { ThemeProvider } from "./theme.provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Notifications />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
