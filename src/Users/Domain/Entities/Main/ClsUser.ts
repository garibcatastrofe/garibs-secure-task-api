import { ClsUserId } from '../ValueObjects/ClsUserId'
import { ClsUserUserName } from "../ValueObjects/ClsUserUserName";
import { ClsUserEmail } from "../ValueObjects/ClsUserEmail";
import { ClsUserPassword } from "../ValueObjects/ClsUserPassword";
import { ClsUserIsAdmin } from '../ValueObjects/ClsUserIsAdmin'

export class ClsUser {
  public userId: ClsUserId
  public userUserName: ClsUserUserName;
  public userEmail: ClsUserEmail;
  public userPassword: ClsUserPassword;
  public userIsAdmin: ClsUserIsAdmin

  public constructor(
    id: ClsUserId,
    user_name: ClsUserUserName,
    email: ClsUserEmail,
    password: ClsUserPassword,
    is_admin: ClsUserIsAdmin
  ) {
    this.userId = id
    this.userUserName = user_name;
    this.userEmail = email;
    this.userPassword = password;
    this.userIsAdmin = is_admin
  }
}
