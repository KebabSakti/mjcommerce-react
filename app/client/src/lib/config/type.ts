import { ReactElement } from "react";

type PropData<T> = {
  data?: T;
  children?: ReactElement;
};

type StateType<T> = {
  value: T;
};

type StateData = {
  loading: boolean;
  data?: Object | null;
};

type SignInParams = {
  email: string;
  password: string;
};

export type { PropData, SignInParams, StateData, StateType };
