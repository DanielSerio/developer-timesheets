import { Header, HEADER_HEIGHT } from "#modules/Core/components/Header";
import { AppShell } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    const [ref, rect] = useResizeObserver(); // 576 min
    return (
      <AppShell
        header={{
          height: rect.width <= 576 ? HEADER_HEIGHT * 2 : HEADER_HEIGHT,
        }}
        ref={ref}
      >
        <Header />
        <Outlet />
      </AppShell>
    );
  },
});
