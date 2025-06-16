import { classNames } from "#modules/Core/utilities/class-name";
import { Button, Loader, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";
import { TbTrash } from "react-icons/tb";

export interface DestructiveButtonProps
  extends Omit<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  isBusy?: boolean;
}

export function DestructiveButton({
  children,
  className,
  disabled,
  isBusy,
  ...props
}: DestructiveButtonProps) {
  return (
    <Button
      type="submit"
      color="red"
      className={classNames(["destructive-button", className])}
      rightSection={isBusy ? <Loader size="xs" color="gray" /> : <TbTrash />}
      disabled={disabled || isBusy}
      {...props}
    >
      <span>{!children ? "Delete" : children}</span>
    </Button>
  );
}
