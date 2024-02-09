import { ProductRating } from "../../../../lib/model/product-rating";
import {
  // DebounceFunction,
  Empty,
  ReducerAction,
  ReducerParameter,
} from "../config/type";
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

export function currency(value: number | bigint | string): string {
  const input = typeof value == "string" ? parseInt(value) : value;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatted = formatter.format(input);

  return formatted;
}

export function urlParser(
  url: string,
  query?: Record<string, any> | Empty
): string {
  const target = new URL(url);

  if (query) {
    target.search = new URLSearchParams(query).toString();
  }

  return target.href;
}

export function calculateRating(rating: ProductRating[]): number {
  const totalRating = rating.reduce((n, { rating }) => n + rating!, 0);
  const totalUser = rating.length;
  const result = totalRating / totalUser;

  return result;
}

export function debounce(
  func: DebounceFunction,
  delay: number
): [DebounceFunction, () => void] {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debouncedFunction: DebounceFunction = function (...args: any[]): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  const cancelDebounce = (): void => {
    clearTimeout(timeoutId);
  };

  return [debouncedFunction, cancelDebounce];
}

type DebounceFunction = (...args: any[]) => void;
