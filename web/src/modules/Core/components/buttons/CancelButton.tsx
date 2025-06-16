import { classNames } from "#modules/Core/utilities/class-name";
import { Button, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";
import { TbCancel } from "react-icons/tb";

export interface CancelButtonProps
  extends Omit<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>, "type"> {}

export function CancelButton({
  children,
  className,
  disabled,
  ...props
}: CancelButtonProps) {
  return (
    <Button
      type="button"
      color="gray"
      className={classNames(["cancel-button", className])}
      rightSection={<TbCancel />}
      {...props}
    >
      <span>{!children ? "Cancel" : children}</span>
    </Button>
  );
}
