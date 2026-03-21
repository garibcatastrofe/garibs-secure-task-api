import { IUserUpdateDto } from '../../Domain/Interfaces/IUserUpdateDto';

import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { ClsUserPartialValidator } from '../Validators/ClsUserPartialValidator';

import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { ClsUserId } from '../../Domain/Entities/ValueObjects/ClsUserId';
import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUpdateUser {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async updateUserAsync({ id, user }: { id: number; user: IUserUpdateDto }): Promise<void> {
    const idVerified = new ClsUserId(id);

    // Buscar el usuario
    const userFound = await this.userRepository.selectUserByIdAsync(idVerified.value);

    // Si el usuario no existe lanzar error
    if (!userFound) {
      throw new ClsNotFoundException({
        message: `El usuario con el id ${idVerified.value} no fue encontrado`,
        ok: false,
      });
    }

    if (user.password !== user.password_confirm) {
      throw new ClsBadRequest({ message: 'Las contraseñas deben ser iguales', ok: false });
    }

    const userBeforeValidation = {
      user_name: user.user_name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
    };

    // Validar los datos del usuario que vengan
    const userValidated = await ClsUserPartialValidator.validateData(userBeforeValidation);

    // Realizar actualización de datos del usuario
    if (Object.keys(userValidated).length > 0) {
      await this.userRepository.updateUserAsync(userFound.id ?? 0, userValidated);
    }
  }
}
