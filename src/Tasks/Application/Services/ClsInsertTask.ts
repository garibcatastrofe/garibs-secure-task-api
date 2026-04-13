import { ITaskRepository } from '../../Domain/Interfaces/ITaskRepository';
import { IUserRepository } from '@/src/Users/Domain/Interfaces/IUserRepository';
import { ITaskCreateDto } from '../../Domain/Interfaces/ITaskCreateDto';
import { ClsTaskMapper } from '../Mappers/ClsTaskMapper';

import { ClsTask } from '../../Domain/Entities/Main/ClsTask';
import { ClsTaskId } from '../../Domain/Entities/ValueObjects/ClsTaskId';
import { ClsTaskTitle } from '../../Domain/Entities/ValueObjects/ClsTaskTitle';
import { ClsTaskDescription } from '../../Domain/Entities/ValueObjects/ClsTaskDescription';
import { ClsTaskCreationDate } from '../../Domain/Entities/ValueObjects/ClsTaskCreationDate';
import { ClsTaskExpirationDate } from '../../Domain/Entities/ValueObjects/ClsTaskExpirationDate';
import { ClsTaskState } from '../../Domain/Entities/ValueObjects/ClsTaskState';
import { ClsUserId } from '@/src/Users/Domain/Entities/ValueObjects/ClsUserId';

import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';

export class ClsInsertTask {
  public constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async insertTaskAsync({
    title,
    description,
    creation_date,
    expiration_date,
    state,
    user_id,
  }: ITaskCreateDto): Promise<number> {
    const userIdVerified = new ClsUserId(user_id);
    const userFound = await this.userRepository.selectUserByIdAsync(userIdVerified.value);

    if (!userFound) {
      throw new ClsNotFoundException({
        message: `El usuario con el id ${user_id} con el que desea ingresar la tarea no fue encontrado`,
        ok: false,
      });
    }

    const newTask = new ClsTask(
      ClsTaskId.empty(),
      new ClsTaskTitle(title),
      new ClsTaskDescription(description),
      new ClsTaskCreationDate(creation_date),
      new ClsTaskExpirationDate(expiration_date),
      new ClsTaskState(state),
      userIdVerified,
    );

    const taskId = await this.taskRepository.insertTaskAsync(ClsTaskMapper.toPrimitive(newTask));

    return taskId;
  }
}
