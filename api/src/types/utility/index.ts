export type Pretty<T> = {
  [k in keyof T]: T[k];
};

export interface DateRange {
  from: Date | null;
  to: Date;
}