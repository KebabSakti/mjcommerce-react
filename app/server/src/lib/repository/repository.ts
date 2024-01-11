import { QueryOption } from "../config/type";

export default abstract class Repository<TModel, TParam extends QueryOption> {
  abstract read(option?: TParam): Promise<TModel>;
  abstract readById(id: string): Promise<TModel>;
  abstract create(data: TModel): Promise<TModel>;
  abstract update(data: TModel): Promise<TModel>;
  abstract delete(data: TModel): Promise<TModel>;
}
