import { ITaskPrimitive } from './ITaskPrimitive';

export interface ITaskUpdateDto extends Partial<Omit<ITaskPrimitive, 'creation_date' | 'user_id'>> {
  id?: number;
}

export interface ITaskUpdateInputDto extends Partial<
  Omit<ITaskPrimitive, 'creation_date' | 'expiration_date' | 'user_id'>
> {
  id?: number;
  expiration_date?: string;
}
