import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { IUserPrimitive } from './IUserPrimitive';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ObjectUserFilterType } from './ObjectUserFilterType';

export interface IUserRepository {
  insertUserAsync(user: IUserPrimitive): Promise<number>;
  selectUsersAsync(
    query: IQueryGeneral<Omit<IUserPrimitive, 'password'>, ObjectUserFilterType>,
  ): Promise<IPaginatedResponse<Omit<IUserPrimitive, 'password'>>>;
  selectUserByIdAsync(id: number): Promise<Omit<IUserPrimitive, 'password'>>;
  updateUserAsync(id: number, user: Partial<IUserPrimitive>): Promise<void>;
  deleteUserAsync(id: number): Promise<void>;
  selectUserByEmailAsync(correo: string): Promise<IUserPrimitive | null>;
  selectUserByUserNameAsync(username: string): Promise<IUserPrimitive | null>;
}
