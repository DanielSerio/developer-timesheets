import { DEFAULT_CATEGORY_PARAMS } from "../const/default-categories.const";
import { MockCategory } from "./category.mock";

export const MOCK_CATEGORIES = [...DEFAULT_CATEGORY_PARAMS].map(({ name }, index) => new MockCategory({ name, index }));