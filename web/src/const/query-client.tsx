import { QueryClient } from "@tanstack/react-query";

export const QUERY_CLIENT = new QueryClient();

export const QUERY_KEYS = {
  categories: {
    list: ["categories", "list"],
    find: ["categories", "find"],
    create: ["categories", "create"],
    update: ["categories", "update"],
    delete: ["categories", "delete"],
  },
  timesheets: {
    list: ["timesheets", "list"],
    find: ["timesheets", "find"],
    create: ["timesheets", "create"],
    update: ["timesheets", "update"],
    delete: ["timesheets", "delete"],
  },
};
