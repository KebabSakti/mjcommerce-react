export enum SortingDirection {
  DESC = "desc",
  ASC = "asc",
}

export type PaginationData = {
  skip: number;
  take: number;
};

export type SortingData = {
  field: string;
  direction: SortingDirection;
};

export type Sort<FieldName extends string> = {
  field: FieldName;
  direction: SortingDirection;
};

export type Filter<FieldName extends string> = {
  field: FieldName;
  value: string[];
};

export type ControllerData<T = Object> = {
  payload?: T | Empty;
  paginate?: PaginationData | Empty;
  sorting?: SortingData | Empty;
};

export type RepositoryData<T = Object> = {
  token?: string | Empty;
  payload?: T | Empty;
  paginate?: PaginationData | Empty;
  sorting?: SortingData | Empty;
};

export type Empty = null | undefined;
