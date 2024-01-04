export default interface UserModel {
  id: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
  orderComplete?: number;
  orderCancel?: number;
  visit?: number;
  link?: string;
  guest?: boolean;
  created?: string;
  updated?: string;
}
