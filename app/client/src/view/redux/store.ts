import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import bannerReducer from "./banner-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    banner: bannerReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
