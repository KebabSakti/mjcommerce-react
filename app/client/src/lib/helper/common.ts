import { ReducerAction, ReducerParameter } from "../config/type";
import { InternalError } from "./failure";

export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}

export function createReducer<T>(
  state: ReducerParameter<T>,
  action: ReducerParameter<T>
) {
  switch (action.type) {
    case ReducerAction.LOAD:
      return {
        ...state,
        payload: action.payload,
        error: null,
      };

    case ReducerAction.ERROR:
      return {
        ...state,
        error: action.error,
      };
  }

  throw new InternalError();
}
