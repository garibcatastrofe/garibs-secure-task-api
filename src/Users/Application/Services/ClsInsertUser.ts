import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { IUserCreateDto } from '../../Domain/Interfaces/IUserCreateDto';
import { ClsUserMapper } from '../Mappers/ClsUserMapper';

import { ClsUser } from '../../Domain/Entities/Main/ClsUser';
import { ClsUserId } from '../../Domain/Entities/ValueObjects/ClsUserId';
import { ClsUserUserName } from '../../Domain/Entities/ValueObjects/ClsUserUserName';
import { ClsUserEmail } from '../../Domain/Entities/ValueObjects/ClsUserEmail';
import { ClsUserPassword } from '../../Domain/Entities/ValueObjects/ClsUserPassword';
import { ClsUserIsAdmin } from '../../Domain/Entities/ValueObjects/ClsUserIsAdmin';

import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';
import { env } from '@/src/Shared/Infrastructure/ClsEnvironmentContainer';
import bcrypt from 'bcryptjs';

export class ClsInsertUser {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async insertUserAsync({
    user_name,
    email,
    password,
    password_confirm,
    is_admin,
  }: IUserCreateDto): Promise<number> {
    const emailVerified = new ClsUserEmail(email);
    const userNameVerified = new ClsUserUserName(user_name);

    // Buscar usuarios por el correoVerificado
    const usersRepeatedEmail = await this.userRepository.selectUsersAsync({
      page: 0,
      perPage: 1,
      order: 'asc',
      orderBy: 'id',
      filtersObject: {
        filterByEmail: {
          operator: '=',
          value: emailVerified.value,
        },
      },
    });

    // Si existe un usuario con ese correo, lanzar un error
    if (usersRepeatedEmail.data.length > 0) {
      throw new ClsBadRequest({
        message: 'Ya existe un usuario con ese correo',
        ok: false,
      });
    }

    const usersRepeatedUserName = await this.userRepository.selectUsersAsync({
      page: 0,
      perPage: 1,
      order: 'asc',
      orderBy: 'id',
      filtersObject: {
        filterByUserName: {
          operator: '=',
          value: userNameVerified.value,
        },
      },
    });

    if (usersRepeatedUserName.data.length > 0) {
      throw new ClsBadRequest({
        message: 'Ya existe un usuario con ese nombre',
        ok: false,
      });
    }

    if (password !== password_confirm) {
      throw new ClsBadRequest({ message: 'Las contraseñas deben ser iguales', ok: false });
    }

    const passwordVerified = new ClsUserPassword(password);

    const saltRounds = Number(env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(passwordVerified.value, saltRounds);
    passwordVerified.value = hashedPassword;

    const newUser = new ClsUser(
      ClsUserId.empty(),
      new ClsUserUserName(user_name),
      new ClsUserEmail(email),
      passwordVerified,
      new ClsUserIsAdmin(is_admin),
    );

    const userId = await this.userRepository.insertUserAsync(ClsUserMapper.toPrimitive(newUser));

    return userId;
  }
}
