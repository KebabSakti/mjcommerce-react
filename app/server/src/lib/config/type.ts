export enum SortType {
  ASC,
  DESC,
}

export type PaginationData = {
  skip: number;
  take: number;
};

export type QueryOption = {
  extra?: Object;
  pagination?: PaginationData;
  order?: { [key: string]: SortType };
};
