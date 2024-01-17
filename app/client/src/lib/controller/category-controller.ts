import { ControllerData, Empty } from "../config/type";
import CategoryModel from "../model/category-model";
import AuthRepository from "../repository/auth-repository";
import CategoryRepository from "../repository/category-repository";

const category = new CategoryRepository();
const auth = new AuthRepository();

export default class CategoryController {
  async read(paramater?: ControllerData | Empty): Promise<CategoryModel[]> {
    const token = auth.getToken();

    const param = {
      token: token,
      paginate: paramater?.paginate,
      sorting: paramater?.sorting,
    };

    const datas = await category.read(param);

    return datas;
  }
}
