import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { IUserPrimitive } from './IUserPrimitive';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';

export interface IUserRepository {
  insertUserAsync(user: IUserPrimitive): Promise<number>;
  selectUsersAsync(
    query: IQueryGeneral<IUserPrimitive>,
  ): Promise<IPaginatedResponse<Omit<IUserPrimitive, 'password'>>>;
  selectUserById(id: number): Promise<IUserPrimitive>;
  updateUserAsync(id: number, user: Partial<IUserPrimitive>): Promise<void>;
  selectUserSignInAsync(correo: string): Promise<IUserPrimitive | null>;
}
