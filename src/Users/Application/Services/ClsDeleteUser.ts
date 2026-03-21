import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { ClsUserId } from '../../Domain/Entities/ValueObjects/ClsUserId';
import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';

export class ClsDeleteUser {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async deleteUserAsync(id: number): Promise<void> {
    const id_user = new ClsUserId(id);

    // Buscar el usuario
    const userFound = await this.userRepository.selectUserByIdAsync(id_user.value);

    // Si el usuario no existe lanzar error
    if (!userFound) {
      throw new ClsNotFoundException({
        message: `El usuario con el id ${id_user.value} no fue encontrado`,
        ok: false,
      });
    }

    await this.userRepository.deleteUserAsync(id_user.value);
  }
}
