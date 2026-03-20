import { IUserPrimitive } from "./IUserPrimitive";

export interface IUserCreateDto extends Omit<IUserPrimitive, "id"> {
  id?: number;
  user_name: string;
  email: string;
  password: string;
  password_confirm: string;
  is_admin: string
}
