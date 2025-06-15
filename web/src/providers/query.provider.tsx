import { QueryClientProvider } from "@tanstack/react-query";
import { QUERY_CLIENT } from "#const/query-client";
import type { PropsWithChildren } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>{children}</QueryClientProvider>
  );
}
