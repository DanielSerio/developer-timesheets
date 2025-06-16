import { classNames } from "#modules/Core/utilities/class-name";
import { Button, Loader, type ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { TbSend2 } from "react-icons/tb";

export interface SubmitButtonProps
  extends Omit<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  isBusy?: boolean;
  icon?: IconType;
}

export function SubmitButton({
  isBusy,
  children,
  className,
  disabled,
  icon,
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled ?? isBusy;
  const Icon = icon ?? TbSend2;
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={classNames(["submit-button", className])}
      rightSection={isBusy ? <Loader size="xs" color="gray" /> : <Icon />}
      {...props}
    >
      <span>{!children ? "Submit" : children}</span>
    </Button>
  );
}
