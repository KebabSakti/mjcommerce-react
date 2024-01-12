import { ProductGalery, ProductRating } from "@prisma/client";

export default interface ProductModel {
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
