import type { CategoryBody, CategoryCreate, CategoryRecord } from "#types/entity/category.types";
import { ClientService } from "./client.service";

class CategoryClientService extends ClientService<CategoryRecord, CategoryCreate, CategoryBody> { }

export const CategoryService = new CategoryClientService('/categories');