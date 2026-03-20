import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';
import { ClsUser } from '../../Domain/Entities/Main/ClsUser';

export class ClsUserMapper {
  public static toPrimitive(user: ClsUser): IUserPrimitive {
    return {
      id: user.userId.value,
      user_name: user.userUserName.value,
      email: user.userEmail.value,
      password: user.userPassword.value,
      is_admin: user.userIsAdmin.value,
    };
  }
}
