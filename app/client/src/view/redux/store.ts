import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./helloSlice";

const store = configureStore({
  reducer: {
    hello: helloReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
