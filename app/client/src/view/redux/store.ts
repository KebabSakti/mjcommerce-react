import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import bannerReducer from "./banner-slice";
import categoryReducer from "./category-slice";
import layoutReducer from "./layout-slice";
import productLatestReducer from "./product-latest-slice";
import productPopularReducer from "./product-popular-slice";
import productReducer from "./product-slice";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    banner: bannerReducer,
    category: categoryReducer,
    product: productReducer,
    productPopular: productPopularReducer,
    productLatest: productLatestReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
