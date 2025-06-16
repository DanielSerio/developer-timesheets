import { useForm } from "@mantine/form";
import { Flex, Group, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { CategoryValidator } from "../utilities/category.validators";
import type { CategoryRecord } from "#types/entity/category.types";
import { SubmitButton } from "#modules/Core/components/buttons/SubmitButton";
import { CancelButton } from "#modules/Core/components/buttons/CancelButton";

export interface CategoryFormProps {
  initialValue?: CategoryRecord;
  onClose?: () => void;
}

export function CategoryForm({ initialValue, onClose }: CategoryFormProps) {
  const form = useForm({
    initialValues: initialValue ?? {
      name: "",
    },
    validate: zodResolver(CategoryValidator),
  });

  return (
    <form>
      <Flex w="100%" h="100%" direction="column">
        <TextInput
          label="Name"
          required
          placeholder="Category Name"
          {...form.getInputProps("name")}
        />
      </Flex>

      <Group component="footer" justify="flex-end" mt="md">
        <CancelButton onClick={onClose} />
        <SubmitButton disabled={!form.isValid()} />
      </Group>
    </form>
  );
}
