import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "#const/query-client";
import { CategoryService } from "#services/category.service";

const queryFn = CategoryService.list;

export function useCategoryList(mock?: boolean) {
  return useQuery({
    queryKey: [...QUERY_KEYS.categories.list, mock ? "mock" : undefined],
    queryFn: async () => await queryFn(mock),
  });
}
