import { ReactElement } from "react";

export enum SortingDirection {
  DESC = "desc",
  ASC = "asc",
}

export type PropData<T> = {
  data?: T;
  children?: ReactElement;
};

export type FailureData = {
  code: number;
  message: string;
};

export type StateType<T> = {
  value: T;
};

export type StateData<T> = {
  data?: T | Empty;
  error?: FailureData | Empty;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type AuthToken = {
  token: string;
};

export type PaginationData = {
  skip: number;
  take: number;
};

export type SortingData = {
  field: string;
  direction: SortingDirection;
};

export type RequestParameter<T = Object> = {
  payload?: T | Empty;
  paginate?: PaginationData | Empty;
  sorting?: SortingData | Empty;
};

export type HttpRequest<T extends Object = Object> = {
  token?: string | Empty;
  query?: Object | Empty;
  data?: T | Empty;
};

export type Empty = null | undefined;
