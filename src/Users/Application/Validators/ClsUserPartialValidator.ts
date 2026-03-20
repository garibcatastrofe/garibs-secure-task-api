import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';

import { ClsUserUserName } from '../../Domain/Entities/ValueObjects/ClsUserUserName';
import { ClsUserEmail } from '../../Domain/Entities/ValueObjects/ClsUserEmail';
import { ClsUserPassword } from '../../Domain/Entities/ValueObjects/ClsUserPassword';
import { ClsUserIsAdmin } from '../../Domain/Entities/ValueObjects/ClsUserIsAdmin';

export class ClsUserPartialValidator {
  public static validateData(user: Partial<IUserPrimitive> | undefined): Partial<IUserPrimitive> {
    const validatedUser: Partial<IUserPrimitive> = {};

    if (user?.user_name !== undefined) {
      validatedUser.user_name = new ClsUserUserName(user.user_name).value;
    }

    if (user?.email !== undefined) {
      validatedUser.email = new ClsUserEmail(user.email).value;
    }

    if (user?.password !== undefined) {
      validatedUser.password = new ClsUserPassword(user.password).value;
    }

    if (user?.is_admin !== undefined) {
      validatedUser.is_admin = new ClsUserIsAdmin(user.is_admin).value;
    }

    return validatedUser;
  }
}
