import { QUERY_KEYS } from "#const/query-client";
import { CategoryService } from "#services/category.service";
import { useMutation } from "@tanstack/react-query";

const createMutationFn = CategoryService.create;
const updateMutationFn = CategoryService.update;
const deleteMutationFn = CategoryService.delete;

type UpdateParams = Parameters<typeof updateMutationFn>;
export type UpdateCategoryPayload = { id: UpdateParams[0] } & Omit<
  UpdateParams[1],
  "mock"
>;

export function useCategoryCreate(mock?: boolean) {
  return useMutation({
    mutationKey: [...QUERY_KEYS.categories.create, mock ? "mock" : undefined],
    mutationFn: (props: Parameters<typeof createMutationFn>[0]) =>
      createMutationFn(props, mock),
  });
}

export function useCategoryUpdate(mock?: boolean) {
  return useMutation({
    mutationKey: [...QUERY_KEYS.categories.update, mock ? "mock" : undefined],
    mutationFn: (props: UpdateCategoryPayload) => {
      const { id } = props;
      return updateMutationFn(id, props, mock);
    },
  });
}

export function useCategoryDelete(mock?: boolean) {
  return useMutation({
    mutationKey: [...QUERY_KEYS.categories.delete, mock ? "mock" : undefined],
    mutationFn: (ids: number[]) => deleteMutationFn(ids, mock),
  });
}
