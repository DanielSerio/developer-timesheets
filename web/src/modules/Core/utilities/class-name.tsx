function isString(val: unknown): val is string {
  return typeof val === "string" && val.trim().length > 0;
}

function getClassNameFromList(list: unknown[]): string | undefined {
  const filteredList = list.flat().filter(isString);

  if (filteredList.length === 0) {
    return undefined;
  }

  return filteredList.join(" ").replace(/\s{2,}/g, " ");
}

/**
 * Creates a className string
 * @param values - values to convert to classNames
 * @returns classNames - string | undefined
 */
export function classNames(...values: unknown[]): string | undefined {
  return getClassNameFromList(values);
}
