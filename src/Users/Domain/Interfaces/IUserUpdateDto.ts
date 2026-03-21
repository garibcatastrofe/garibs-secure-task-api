import { IUserPrimitive } from './IUserPrimitive';

export interface IUserUpdateDto extends Partial<IUserPrimitive> {
  id: number;
  password_confirm: string;
}
