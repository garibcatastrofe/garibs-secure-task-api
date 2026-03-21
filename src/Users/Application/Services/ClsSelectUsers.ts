import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';
import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { ObjectUserFilterType } from '../../Domain/Interfaces/ObjectUserFilterType';

export class ClsSelectUsers {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async selectUsersAsync(
    query: IQueryGeneral<Omit<IUserPrimitive, 'password'>, ObjectUserFilterType>,
  ): Promise<IPaginatedResponse<Omit<IUserPrimitive, 'password'>>> {
    const users = await this.userRepository.selectUsersAsync(query);

    return users;
  }
}
