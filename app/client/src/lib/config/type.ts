import { ReactElement } from "react";
import { Failure } from "../helper/failure";

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
  data?: T | null | undefined;
  error?: FailureData | null | undefined;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type AuthToken = {
  token: string;
};
