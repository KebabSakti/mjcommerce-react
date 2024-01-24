import { Empty, PaginationData, Sort } from "../config/type";
import CategoryModel from "./category-model";
import ProductGalery from "./product-gallery";
import ProductRating from "./product-rating";
import ProductVariant from "./product-variant";
import StoreModel from "./store-model";

export enum ProductSortingField {
  PRIORITY = "priority",
  PRICE = "price",
  SELL = "sell",
  VIEW = "view",
  RATING = "rating",
  CREATED = "created",
}

export enum ProductUpdateField {
  SELL = "sell",
  VIEW = "view",
  RATING = "rating",
}

export type ProductFilterField = {
  storeId?: string | Empty;
  categoryId?: string | Empty;
  name?: string | Empty;
};

export type ProductReadParameter = {
  paginate: PaginationData;
  filter?: ProductFilterField | Empty;
  sort?: Sort<ProductSortingField> | Empty;
};

export type ProductUpdateParameter = {
  field: ProductUpdateField;
  value?: number | Empty;
};

export interface ProductModel {
  id?: string;
  storeId?: string;
  categoryId?: string;
  priority?: number;
  name?: string;
  description?: string;
  picture?: string;
  stok?: number;
  min?: number;
  max?: number;
  price?: number;
  wholesalePrice?: number;
  wholesaleMin?: number;
  unit?: string;
  weight?: number;
  sell?: number;
  view?: number;
  rating?: number;
  active?: boolean;
  created?: string;
  updated?: string;
  category?: CategoryModel;
  store?: StoreModel;
  productGalery?: ProductGalery[];
  productRating?: ProductRating[];
  productVariant?: ProductVariant[];
}
