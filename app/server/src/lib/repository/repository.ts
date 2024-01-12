import { QueryOption } from "../config/type";

export default abstract class Repository<TModel, TParam extends QueryOption> {
  abstract read(option?: TParam): Promise<TModel[]>;
  abstract readById(id: string): Promise<TModel | null>;
  abstract create(data: TModel): Promise<void>;
  abstract update(data: TModel): Promise<void>;
  abstract delete(data: TModel): Promise<void>;
}
