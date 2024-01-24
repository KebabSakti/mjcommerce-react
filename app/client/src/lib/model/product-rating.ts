import UserModel from "./user-model";

export default interface ProductRating {
  id?: string;
  userId?: string;
  productId?: string;
  productName?: string;
  rating?: number;
  comment?: string;
  created?: string;
  updated?: string;
  user?: UserModel;
}
