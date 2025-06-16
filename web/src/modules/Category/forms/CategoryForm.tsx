import { useForm } from "@mantine/form";
import { Flex, Group, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { CategoryValidator } from "../utilities/category.validators";
import type { CategoryRecord } from "#types/entity/category.types";
import { SubmitButton } from "#modules/Core/components/buttons/SubmitButton";
import { CancelButton } from "#modules/Core/components/buttons/CancelButton";

export interface CategoryFormProps {
  initialValue?: CategoryRecord;
  isBusy: boolean;
  onClose?: () => void;
  onCreateSubmit: (...params: any[]) => void;
  onUpdateSubmit: (...params: any[]) => void;
}

export function CategoryForm({
  initialValue,
  isBusy,
  onUpdateSubmit,
  onCreateSubmit,
  onClose,
}: CategoryFormProps) {
  const form = useForm({
    initialValues: initialValue ?? {
      name: "",
    },
    validate: zodResolver(CategoryValidator),
  });

  const onSubmit = form.onSubmit((values) => {
    if (initialValue) {
      onUpdateSubmit({
        ...initialValue,
        ...values,
      });
    } else {
      onCreateSubmit({
        ...values,
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex w="100%" h="100%" direction="column">
        <TextInput
          label="Name"
          required
          placeholder="Category Name"
          {...form.getInputProps("name")}
        />
      </Flex>

      <Group component="footer" justify="flex-end" mt="md">
        <CancelButton disabled={isBusy} onClick={onClose} />
        <SubmitButton disabled={!form.isValid()} isBusy={isBusy} />
      </Group>
    </form>
  );
}
