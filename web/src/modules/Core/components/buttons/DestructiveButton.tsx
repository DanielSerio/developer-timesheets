import { classNames } from "#modules/Core/utilities/class-name";
import { Button, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";
import { TbTrash } from "react-icons/tb";

export interface DestructiveButtonProps
  extends Omit<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>, "type"> {}

export function DestructiveButton({
  children,
  className,
  disabled,
  ...props
}: DestructiveButtonProps) {
  return (
    <Button
      type="submit"
      color="red"
      className={classNames(["destructive-button", className])}
      rightSection={<TbTrash />}
      {...props}
    >
      <span>{!children ? "Delete" : children}</span>
    </Button>
  );
}
