import {
  useCategoryCreate,
  useCategoryDelete,
  useCategoryUpdate,
} from "#hooks/mutation/useCategoryMethods";
import { useCategoryList } from "#hooks/query/useCategoryList";
import { createContext, useContext, type PropsWithChildren } from "react";

function useCategoriesState(mock?: boolean) {
  const queries = {
    list: useCategoryList(mock),
  };

  const methods = {
    create: useCategoryCreate(mock),
    update: useCategoryUpdate(mock),
    delete: useCategoryDelete(mock),
  };

  return [queries, methods] as const;
}

const CategoriesContext = createContext<null | ReturnType<
  typeof useCategoriesState
>>(null);

export const CategoriesProvider = ({
  children,
  mock,
}: PropsWithChildren<{ mock?: boolean }>) => {
  const state = useCategoriesState(mock);

  return (
    <CategoriesContext.Provider value={state}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  if (CategoriesContext == null) {
    throw new Error(`Categories context cannot be null`);
  }

  return useContext(CategoriesContext)!;
};
