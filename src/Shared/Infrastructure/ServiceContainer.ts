/* USERS */
import { ClsInsertUser } from '@/src/Users/Application/Services/ClsInsertUser';
import { ClsDeleteUser } from '@/src/Users/Application/Services/ClsDeleteUser';
import { ClsSelectUserById } from '@/src/Users/Application/Services/ClsSelectUserById';
import { ClsSelectUsers } from '@/src/Users/Application/Services/ClsSelectUsers';
import { ClsUpdateUser } from '@/src/Users/Application/Services/ClsUpdateUser';
import { ClsSignInUser } from '@/src/Users/Application/Services/ClsSignInUser';
import { ClsUserNeonRepository } from '@/src/Users/Infrastructure/ClsUserNeonRepository';

/* TASKS */
import { ClsInsertTask } from '@/src/Tasks/Application/Services/ClsInsertTask';
import { ClsDeleteTask } from '@/src/Tasks/Application/Services/ClsDeleteTask';
import { ClsSelectTaskById } from '@/src/Tasks/Application/Services/ClsSelectTaskById';
import { ClsSelectTasks } from '@/src/Tasks/Application/Services/ClsSelectTasks';
import { ClsUpdateTask } from '@/src/Tasks/Application/Services/ClsUpdateTask';
import { ClsTaskNeonRepository } from '@/src/Tasks/Infrastructure/ClsTaskNeonRepository';

/* REPOS */
const UserRepository = new ClsUserNeonRepository();
const TaskRepository = new ClsTaskNeonRepository();

/* SERVICE CONTAINER */
export const ServiceContainer = {
  Users: {
    insert: new ClsInsertUser(UserRepository),
    delete: new ClsDeleteUser(UserRepository),
    select: new ClsSelectUsers(UserRepository),
    selectById: new ClsSelectUserById(UserRepository),
    update: new ClsUpdateUser(UserRepository),
    signIn: new ClsSignInUser(UserRepository),
  },

  Tasks: {
    insert: new ClsInsertTask(TaskRepository, UserRepository),
    delete: new ClsDeleteTask(TaskRepository),
    select: new ClsSelectTasks(TaskRepository),
    selectById: new ClsSelectTaskById(TaskRepository),
    update: new ClsUpdateTask(TaskRepository),
  },
};
