import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./helloSlice";

const userStore = configureStore({
  reducer: {
    hello: helloReducer,
  },
});

export { userStore };
export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
