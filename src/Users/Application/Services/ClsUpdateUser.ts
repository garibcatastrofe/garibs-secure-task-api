import { IUserUpdateDto } from '../../Domain/Interfaces/IUserUpdateDto';

import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { ClsUserPartialValidator } from '../Validators/ClsUserPartialValidator';

import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { ClsUserId } from '../../Domain/Entities/ValueObjects/ClsUserId';
import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUpdateUser {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async updateUserAsync({
    id,
    user,
  }: {
    id: number;
    user: Partial<IUserUpdateDto>;
  }): Promise<void> {
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

    if (user !== undefined) {
      if (user.password !== undefined) {
        if (user.password_confirm === undefined) {
          throw new ClsBadRequest({
            message: 'Debe proporcionar la contraseña verificada',
            ok: false,
          });
        }

        if (user.password !== user.password_confirm) {
          throw new ClsBadRequest({ message: 'Las contraseñas deben ser iguales', ok: false });
        }
      }

      // Si quiere actualizar el email, verificar que nadie más lo tenga
      if (user.email !== undefined) {
        // Buscar usuarios por el correo
        const usersRepeatedEmail = await this.userRepository.selectUserByEmailAsync(user.email);

        // Si encontró a un usuario con ese email, verificar que sea el mismo al que se desea actualizar, de lo contrario, lanzar error porque dos usuarios no pueden tener el mismo email
        if (usersRepeatedEmail) {
          if (usersRepeatedEmail.id !== userFound.id) {
            throw new ClsBadRequest({
              message: 'Ya existe un usuario con ese correo',
              ok: false,
            });
          }
        }
      }

      // Si quiere actualizar el user_name, verificar que nadie más lo tenga
      if (user.user_name !== undefined) {
        // Buscar usuarios por el correo
        const usersRepeatedUserName = await this.userRepository.selectUserByUserNameAsync(
          user.user_name,
        );

        // Si encontró a un usuario con ese correo, verificar que sea el mismo al que se desea actualizar, de lo contrario, lanzar error porque dos usuarios no pueden tener el mismo correo
        if (usersRepeatedUserName) {
          if (usersRepeatedUserName.id !== userFound.id) {
            throw new ClsBadRequest({
              message: 'Ya existe un usuario con ese nombre de usuario',
              ok: false,
            });
          }
        }
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
}
