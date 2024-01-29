import { BannerModel } from "../../../../lib/model/banner-model";
import { AppAction, AppState } from "../../lib/config/type";
import { InternalError } from "../../lib/helper/failure";

export function BannerReducer(
  state: AppState<BannerModel[]>,
  action: AppAction<BannerModel[]>
) {
  switch (action.type) {
    case "load":
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case "error":
      return {
        ...state,
        error: action.error,
      };
  }

  throw new InternalError();
}
