import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';

export class ClsSelectUsuarioById {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async selectUserByIdAsync(id: number): Promise<Omit<IUserPrimitive, 'password'> | null> {
    const userFound = await this.userRepository.selectUserByIdAsync(id);

    if (!userFound) {
      throw new ClsNotFoundException({
        message: `El usuario con el id ${id} no fue encontrado`,
        ok: false,
      });
    }

    return userFound ?? null;
  }
}
