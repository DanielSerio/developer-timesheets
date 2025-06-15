import { AppShellMain, type AppShellMainProps } from "@mantine/core";

import { classNames } from "../utilities/class-name";

export function Page({ children, className, ...props }: AppShellMainProps) {
  const classes = ["page", className];
  return (
    <AppShellMain className={classNames(classes)} {...props}>
      {children}
    </AppShellMain>
  );
}
