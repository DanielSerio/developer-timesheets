import { CategoriesProvider } from "#modules/Category/hooks/useCategories";
import { CategoryListPage } from "#modules/Category/pages/CategoryListPage";
import { createFileRoute } from "@tanstack/react-router";
import "#styles/output/category-list.scss";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CategoriesProvider mock={true}>
      <CategoryListPage />
    </CategoriesProvider>
  );
}
