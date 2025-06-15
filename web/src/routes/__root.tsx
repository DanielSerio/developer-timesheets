import { Header, HEADER_HEIGHT } from "#modules/Core/components/Header";
import { AppShell } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <AppShell header={{ height: HEADER_HEIGHT }}>
      <Header />
      <Outlet />
    </AppShell>
  ),
});
