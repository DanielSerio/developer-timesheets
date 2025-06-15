import { Page } from "#modules/Core/components/Page";
import { useCategories } from "../hooks/useCategories";

export function CategoryListPage() {
  const [{ list }] = useCategories();

  console.log(list);

  return (
    <Page>
      <div>{JSON.stringify(list.data)}</div>
    </Page>
  );
}
