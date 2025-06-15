import { QUERY_KEYS } from "#const/query-client";
import { CategoryService } from "#services/category.service";
import { useQuery } from "@tanstack/react-query";

const queryFn = CategoryService.find;

export function useCategory(id: number, mock?: boolean) {
  return useQuery({
    enabled: !!id,
    queryKey: [...QUERY_KEYS.categories.find, id, mock ? "mock" : undefined],
    queryFn: () => queryFn(id, mock),
  });
}
