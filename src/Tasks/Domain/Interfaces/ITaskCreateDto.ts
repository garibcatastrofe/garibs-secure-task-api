import { ITaskPrimitive } from './ITaskPrimitive';

export interface ITaskCreateDto extends Omit<
  ITaskPrimitive,
  'id' | 'creation_date' | 'expiration_date'
> {
  id?: number;
  creation_date: string;
  expiration_date: string;
}
