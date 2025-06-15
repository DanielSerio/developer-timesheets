import { type PropsWithChildren } from "react";
import { QueryProvider } from "./query.provider";
import { ThemeProvider } from "./theme.provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
}
