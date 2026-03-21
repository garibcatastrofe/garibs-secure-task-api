/* USERS */
import { ClsInsertUser } from '@/src/Users/Application/Services/ClsInsertUser';
import { ClsDeleteUser } from '@/src/Users/Application/Services/ClsDeleteUser';
import { ClsSelectUsuarioById } from '@/src/Users/Application/Services/ClsSelectUserById';
import { ClsSelectUsers } from '@/src/Users/Application/Services/ClsSelectUsers';
import { ClsUpdateUser } from '@/src/Users/Application/Services/ClsUpdateUser';
import { ClsUserNeonRepository } from '@/src/Users/Infrastructure/ClsUserNeonRepository';

/* REPOS */
const UserRepository = new ClsUserNeonRepository();

/* SERVICE CONTAINER */
export const ServiceContainer = {
  Users: {
    insert: new ClsInsertUser(UserRepository),
    delete: new ClsDeleteUser(UserRepository),
    select: new ClsSelectUsers(UserRepository),
    selectById: new ClsSelectUsuarioById(UserRepository),
    update: new ClsUpdateUser(UserRepository),
  },
};
