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

export type Sorting<T extends string> = {
  field: T;
  direction: SortingDirection;
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
