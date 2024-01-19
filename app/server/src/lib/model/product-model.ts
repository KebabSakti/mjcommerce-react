import { ProductGalery, ProductRating } from "@prisma/client";
import { PaginationData, Sort } from "../config/type";
import { Empty } from "./../config/type";

export enum ProductSortingField {
  PRIORIOTY = "priority",
  PRICE = "price",
  SELL = "sell",
  VIEW = "view",
  RATING = "rating",
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
  stok?: number;
  min?: number;
  max?: number;
  price?: number;
  wholesalePrice?: number;
  wholesaleMin?: number;
  unit?: string;
  weight?: number;
  sell?: number;
  rating?: number;
  active?: boolean;
  created?: string;
  updated?: string;
  productGallery?: ProductGalery[];
  productRating?: ProductRating[];
}
