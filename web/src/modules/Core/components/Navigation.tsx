import { Box, Flex, Group } from "@mantine/core";
import { HEADER_HEIGHT } from "./Header";
import { Link, type LinkComponent } from "@tanstack/react-router";
import { TbFileSpreadsheet, TbCategory2 } from "react-icons/tb";

import type { ComponentProps } from "react";
import { type IconType } from "react-icons";

interface NavigationLinkProps
  extends ComponentProps<LinkComponent<"a", string>> {
  title: string;
  icon?: IconType;
}

function AutoNavContent({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: IconType;
}) {
  return (
    <Flex gap={4} align="center">
      <Box component="span" className="text">
        {title}
      </Box>
      {!!Icon && (
        <Box component="span" className="icon">
          <Icon size={18} style={{ transform: "translateY(2px)" }} />
        </Box>
      )}
    </Flex>
  );
}

function NavigationLink({ to, children, title, icon }: NavigationLinkProps) {
  return (
    <Link to={to}>
      {!!children ? children : <AutoNavContent title={title} icon={icon} />}
    </Link>
  );
}

export function Navigation() {
  return (
    <Group className="navigation" h={HEADER_HEIGHT}>
      <NavigationLink to="/" title="Timesheets" icon={TbFileSpreadsheet} />
      <NavigationLink to="/categories" title="Categories" icon={TbCategory2} />
    </Group>
  );
}
