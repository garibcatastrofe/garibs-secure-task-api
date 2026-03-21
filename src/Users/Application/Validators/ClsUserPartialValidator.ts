import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';

import { ClsUserUserName } from '../../Domain/Entities/ValueObjects/ClsUserUserName';
import { ClsUserEmail } from '../../Domain/Entities/ValueObjects/ClsUserEmail';
import { ClsUserPassword } from '../../Domain/Entities/ValueObjects/ClsUserPassword';
import { ClsUserIsAdmin } from '../../Domain/Entities/ValueObjects/ClsUserIsAdmin';

import { env } from '@/src/Shared/Infrastructure/ClsEnvironmentContainer';
import bcrypt from 'bcryptjs';

export class ClsUserPartialValidator {
  public static async validateData(
    user: Partial<IUserPrimitive> | undefined,
  ): Promise<Partial<IUserPrimitive>> {
    const validatedUser: Partial<IUserPrimitive> = {};

    if (user?.user_name !== undefined) {
      validatedUser.user_name = new ClsUserUserName(user.user_name).value;
    }

    if (user?.email !== undefined) {
      validatedUser.email = new ClsUserEmail(user.email).value;
    }

    if (user?.password !== undefined) {
      validatedUser.password = new ClsUserPassword(user.password).value;

      const saltRounds = Number(env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(validatedUser.password, saltRounds);
      validatedUser.password = hashedPassword;
    }

    if (user?.is_admin !== undefined) {
      validatedUser.is_admin = new ClsUserIsAdmin(user.is_admin).value;
    }

    return validatedUser;
  }
}
