export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export type PaginationData = {
  skip: number;
  take: number;
};

export type QueryOption = {
  extra?: Object;
  relation?: boolean;
  pagination?: PaginationData;
  order?: { [key: string]: SortType }[];
};
